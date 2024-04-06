package main

import "testing"
import "github.com/stretchr/testify/assert"

func Hello(name string) string {
	return fmt.Sprintf("Hello, %s", name)
}

func TestHello(t *testing.T) {
    assert.Equal(t, "Hello, Max", Hello("Max"))
}