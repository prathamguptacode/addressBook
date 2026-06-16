package controller

import (
	"context"
	"encoding/json"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/prathamguptacode/addressBook/src/db"
	"github.com/prathamguptacode/addressBook/src/model"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

var gconf *oauth2.Config

type userGoogleT struct {
	Email         string `json:"email"`
	Name          string `json:"name"`
	VerifiedEmail bool   `json:"verified_email"`
}

func SignUser(c fiber.Ctx) error {
	block := c.Params("block")
	room := c.Params("room")
	check := model.CheckValidBlock(block)
	if check == false {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid block"})
	}
	roomVal, err := strconv.Atoi(room)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid room"})
	}

	blockCookie := new(fiber.Cookie)
	blockCookie.Name = "block"
	blockCookie.Value = block
	blockCookie.Expires = time.Now().Add(10 * time.Minute)
	c.Cookie(blockCookie)

	roomCookie := new(fiber.Cookie)
	roomCookie.Name = "room"
	roomCookie.Value = room
	roomCookie.Expires = time.Now().Add(10 * time.Minute)
	c.Cookie(roomCookie)

	var floor int = roomVal / 100
	floorCookie := new(fiber.Cookie)
	floorCookie.Name = "floor"
	floorCookie.Value = strconv.Itoa(floor)
	floorCookie.Expires = time.Now().Add(10 * time.Minute)
	c.Cookie(floorCookie)

	cliendId := os.Getenv("CLIENT_ID")
	clientSecret := os.Getenv("CLIENT_SECRET")
	clientUrl := os.Getenv("CLIENT_URL")
	if cliendId == "" && clientSecret == "" && clientUrl == "" {
		return c.Status(500).JSON(fiber.Map{"message": "creds not found"})
	}
	conf := &oauth2.Config{
		ClientID:     cliendId,
		ClientSecret: clientSecret,
		RedirectURL:  clientUrl,
		Scopes:       []string{"email", "profile"},
		Endpoint:     google.Endpoint,
	}
	gconf = conf
	url := conf.AuthCodeURL("state")
	return c.JSON(fiber.Map{"url": url})

}

func Callback(c fiber.Ctx) error {
	q := c.Queries()
	code := q["code"]
	if code == "" {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
	}
	tok, err := gconf.Exchange(oauth2.NoContext, code)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wropng please try again later"})
	}
	client := gconf.Client(oauth2.NoContext, tok)
	resp, errC := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if errC != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
	}
	var googleResUser userGoogleT
	errJ := json.NewDecoder(resp.Body).Decode(&googleResUser)
	if errJ != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
	}
	if googleResUser.VerifiedEmail == false {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
	}
	block := c.Cookies("block")
	room := c.Cookies("room")
	floor := c.Cookies("floor")
	if block == "" || room == "" || floor == "" {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
	}
	checkBlk := model.CheckValidBlock(block)
	if checkBlk == false {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
	}

	urlRed := os.Getenv("URL")

	//db operation
	filter := bson.D{{"email", googleResUser.Email}}
	var oldUser model.UserT
	errFd := db.AddressBookDb.Collection("users").FindOne(context.TODO(), filter).Decode(&oldUser)
	if errFd == mongo.ErrNoDocuments {
		user := model.UserT{
			Username: strings.ToLower(googleResUser.Name),
			Verified: googleResUser.VerifiedEmail,
			Email:    googleResUser.Email,
			Block:    block,
			Room:     room,
			Floor:    floor,
		}
		userIns, errDb := db.AddressBookDb.Collection("users").InsertOne(context.TODO(), user)
		if errDb != nil {
			return c.Status(500).JSON(fiber.Map{"message": "Something went wrong"})
		}

		var oldRoom model.RoomT
		filter := bson.D{{"roomNumber", room}}
		errRm := db.AddressBookDb.Collection(block).FindOne(context.TODO(), filter).Decode(&oldRoom)
		if errRm == mongo.ErrNoDocuments {
			newRoom := model.RoomT{
				RoomNumber: room,
				Members:    []bson.ObjectID{userIns.InsertedID.(bson.ObjectID)},
				Floor:      floor,
				Block:      block,
			}
			_, errRio := db.AddressBookDb.Collection(block).InsertOne(context.TODO(), newRoom)
			if errRio != nil {
				return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
			}
			redirectUrl := urlRed + "/profile?name=" + googleResUser.Name + "&block=" + block + "&room=" + room
			return c.Redirect().To(redirectUrl)
		}
		if errRm != nil {
			return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
		}
		update := bson.D{{"$push", bson.D{{"members", userIns.InsertedID.(bson.ObjectID)}}}}
		_, errRo := db.AddressBookDb.Collection(block).UpdateOne(context.TODO(), filter, update)
		if errRo != nil {
			return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
		}
		redirectUrl := urlRed + "/profile?name=" + googleResUser.Name + "&block=" + block + "&room=" + room
		return c.Redirect().To(redirectUrl)
	}
	if errFd != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wrong "})
	}
	redirectUrl := urlRed + "/profile?name=" + oldUser.Username + "&block=" + oldUser.Block + "&room=" + oldUser.Room
	return c.Redirect().To(redirectUrl)
}

func SearchUser(c fiber.Ctx) error {
	q := c.Queries()
	reqName := q["q"]
	if reqName == "" {
		return c.Status(400).JSON(fiber.Map{"message": "Invalid query"})
	}
	filter := bson.D{{"username", bson.D{{"$regex", "^" + strings.ToLower(reqName)}}}}
	cursor, err := db.AddressBookDb.Collection("users").Find(context.TODO(), filter)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Something went wrong"})
	}
	var users []model.UserT
	cursor.All(context.TODO(), &users)
	return c.JSON(fiber.Map{"users": users})
}
