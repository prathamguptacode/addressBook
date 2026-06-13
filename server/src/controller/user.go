package controller

import (
	"log"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v3"
	"github.com/prathamguptacode/addressBook/src/model"
)

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

	return c.SendString("undersonstruction")

}
