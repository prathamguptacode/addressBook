package controller

import (
	"context"
	"sync"

	"github.com/gofiber/fiber/v3"
	"github.com/prathamguptacode/addressBook/src/db"
	"github.com/prathamguptacode/addressBook/src/model"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type userT struct {
	Username string `json:"username" bson:"username"`
}
type roomT struct {
	RoomNumber string          `json:"roomNumber" bson:"roomNumber"`
	Block      string          `json:"block" bson:"block"`
	Members    []bson.ObjectID `json:"members" bson:"members"`
	MemberD    []userT         `json:"membersD" bson:"membersD"`
}

func ViewRoom(c fiber.Ctx) error {
	q := c.Queries()
	reqFilter := q["q"]
	resRoom := []roomT{}
	var wg = sync.WaitGroup{}
	var m = sync.Mutex{}
	if reqFilter == "" {
		wg.Add(6)
		go getRoom("A_BLOCK", &resRoom, &wg, &m)
		go getRoom("B_BLOCK", &resRoom, &wg, &m)
		go getRoom("C_BLOCK", &resRoom, &wg, &m)
		go getRoom("D1_BLOCK", &resRoom, &wg, &m)
		go getRoom("D2_BLOCK", &resRoom, &wg, &m)
		go getRoom("E_BLOCK", &resRoom, &wg, &m)
		wg.Wait()
		return c.JSON(fiber.Map{"rooms": resRoom})
	}
	check := model.CheckValidBlock(reqFilter)
	if check == true {
		wg.Add(1)
		go getRoom(reqFilter, &resRoom, &wg, &m)
		wg.Wait()
		return c.JSON(fiber.Map{"rooms": resRoom})
	}
	return c.Status(400).JSON(fiber.Map{"message": "Invalid query"})
}

func getRoom(col string, r *[]roomT, wg *sync.WaitGroup, m *sync.Mutex) {
	defer wg.Done()
	// cursor, err := db.AddressBookDb.Collection(col).Find(context.TODO(), bson.D{{}})
	grpStage := bson.D{
		{"$lookup",
			bson.D{
				{"from", "users"},
				{"localField", "members"},
				{"foreignField", "_id"},
				{"pipeline",
					bson.A{
						bson.D{
							{"$project", bson.D{
								{"username", 1},
							}},
						},
					}},
				{"as", "membersD"},
			},
		},
	}

	//
	// {
	//    $lookup:
	//      {
	//        from: users,
	//        localField: members,
	//        foreignField: _id,
	//         pipeline: [
	//        {
	//        $project:{"username":1}
	//        }
	//        ]
	//        as: membersD
	//      }
	// }
	//

	cursor, err := db.AddressBookDb.Collection(col).Aggregate(context.TODO(), mongo.Pipeline{grpStage})
	if err == nil {
		var room []roomT
		cursor.All(context.TODO(), &room)
		m.Lock()
		*r = append(*r, room...)
		m.Unlock()
	}
}
