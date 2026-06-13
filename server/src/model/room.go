package model

import "go.mongodb.org/mongo-driver/v2/bson"

type RoomT struct {
	RoomNumber string          `json:"roomNumber" bson:"roomNumber"`
	Members    []bson.ObjectID `json:"members" bson:"members"`
	Floor      string          `json:"floor" bson:"floor"`
	Block      string          `json:"block" bson:"block"`
}
