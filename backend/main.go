package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/", hello)
	r.Run(":3000")
}

func hello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"hello": "Hello from gin",
	})
}
