package db

import (
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var AddressBookDb *mongo.Database

func Connect() {
	uri := os.Getenv("DB_URL")
	if uri == "" {
		log.Fatal("Cannot find DB Url")
	}
	log.Println("Trying to connect to db")
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	AddressBookDb = client.Database("AddressBook")
	log.Println("Connected to DB")
}
