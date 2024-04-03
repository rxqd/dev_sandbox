package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"

	"github.com/pelletier/go-toml/v2"
)

type Module struct {
	FullName string
	Name     string
	Version  int
	Date     string
	Hash     string
}

func main() {
	// modulesArray := getModules()
	// modules := parseModules(modulesArray)

	// TODO:
	// search module name in modules from URL,
	// check latest version, update to the latest version

	replitModules := readReplitModules()

	fmt.Println(replitModules)

	for moduleName, module := range replitModules {
	}
}

func getModulesFromURL() []byte {
	const url = "https://raw.githubusercontent.com/replit/nixmodules/main/modules.json"
	response, err := http.Get(url)
	if err != nil {
		fmt.Println("Error fetching data:", err)
		os.Exit(1)
	}
	defer response.Body.Close()

	if response.StatusCode < 200 || response.StatusCode >= 300 {
		fmt.Println("Request failed with status code:", response.StatusCode)
		os.Exit(1)
	}

	rawModules, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
		os.Exit(1)
	}

	return rawModules
}

func getModules() []string {
	var parsedData map[string]interface{}

	err := json.Unmarshal(getModulesFromURL(), &parsedData)
	if err != nil {
		fmt.Println("Error parsing JSON:", err)
		os.Exit(1)
	}

	modules := []string{}
	for m := range parsedData {
		modules = append(modules, m)
	}

	return modules
}

func parseModules(modulesArray []interface{}) map[string][]Module {
	const modulePattern = `^(?P<name>.*):v(?P<version>.*)-(?P<date>.*)-(?P<hash>.*)$`
	re := regexp.MustCompile(modulePattern)

	modules := make(map[string][]Module)

	for _, maybeString := range modulesArray {
		moduleString, ok := maybeString.(string) // Assert as a string
		if !ok {
			fmt.Println("Modules must be strings")
			os.Exit(1)
		}
		match := re.FindStringSubmatch(moduleString)

		// Extract variables from module string
		parts := make(map[string]string)
		for index, key := range re.SubexpNames() {
			if index != 0 && key != "" {
				parts[key] = match[index]
			}
		}

		module := Module{
			FullName: moduleString,
			Name:     parts["name"],
			Date:     parts["date"],
			Hash:     parts["hash"],
		}

		if version, err := strconv.Atoi(parts["version"]); err != nil {
			fmt.Println("Error converting integer:", err)
			os.Exit(1)
		} else {
			module.Version = version
		}

		modules[module.Name] = append(modules[module.Name], module)
	}

	for _, values := range modules {
		sort.Slice(values[:], func(i, j int) bool {
			return values[i].Version < values[j].Version
		})
	}

	return modules
}

func readReplitModules() map[string][]Module {
	rootDir, err := filepath.Abs(filepath.Dir(os.Getenv("GOMOD")))
	if err != nil {
		log.Fatal(err)
	}
	replitPath := filepath.Join(rootDir, ".replit")
	data, err := os.ReadFile(replitPath)
	if err != nil {
		fmt.Println("Error reading TOML file:", err)
		os.Exit(1)
	}

	var replitConfig map[string]interface{}
	err = toml.Unmarshal(data, &replitConfig)
	if err != nil {
		fmt.Println("Error parsing TOML:", err)
		os.Exit(1)
	}

	rawModules, ok := replitConfig["modules"].([]interface{})
	if !ok {
		fmt.Println("Error: 'modules' is invalid key in .replit")
		os.Exit(1)
	}

	modules := parseModules(rawModules)

	return modules
}
