package controller

import (
	"encoding/json"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/prathamguptacode/addressBook/src/model"
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
	if cliendId == "" && clientSecret == "" {
		return c.Status(500).JSON(fiber.Map{"message": "creds not found"})
	}
	conf := &oauth2.Config{
		ClientID:     cliendId,
		ClientSecret: clientSecret,
		RedirectURL:  "http://localhost:3000/callback",
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
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
	}
	var googleResUser userGoogleT
	errJ := json.NewDecoder(resp.Body).Decode(&googleResUser)
	if errJ != nil {
		return c.Status(400).JSON(fiber.Map{"message": "Something went wrong"})
	}
	return c.JSON(fiber.Map{"user": googleResUser})
}
