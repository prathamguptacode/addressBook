package src

import (
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/prathamguptacode/addressBook/src/controller"
	"github.com/prathamguptacode/addressBook/src/db"
)

func App() {

	db.Connect()
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowCredentials: true,
	}))

	app.Get("/", func(c fiber.Ctx) error {
		return c.JSON(fiber.Map{"message": "welcome to address book goServer", "poweredBy": "GO"})
	})

	app.Post("/verify/:block/:room", controller.SignUser)

	app.Get("/callback", controller.Callback)

	app.Get("/rooms", controller.ViewRoom)

	app.Get("/search", controller.SearchUser)

	log.Println("Server port port 3000")
	log.Fatal(app.Listen(":3000"))

}
