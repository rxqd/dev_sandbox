package main

import (
	"net/http"
	"app"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/", helloHandler)
	r.Run(":3000")
}

func helloHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hello": app.hello(),
	})
}
