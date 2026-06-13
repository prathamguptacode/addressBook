package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/prathamguptacode/addressBook/src"
)

func main() {

	log.Println("Welcome to address book go server")
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}
	src.App()

}
