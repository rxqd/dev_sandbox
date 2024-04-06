package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"sort"
	"strconv"
	"time"

	"github.com/pelletier/go-toml/v2"
)

type Module struct {
	FullName string
	Name     string
	Version  int
	Date     string
	Hash     string
}

var replitConfig map[string]interface{}

func main() {
	updateModulesToLatest()
}

func updateModulesToLatest() {
	modules := getGithubModules()
	getReplitConfig()
	replitModules := readReplitModules()

	syncModules(replitModules, modules)
	saveReplitConfig()
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

func getGithubModules() map[string][]Module {
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

	return parseModules(modules)
}

func parseModules(modulesArray []string) map[string][]Module {
	const modulePattern = `^(?P<name>.*):v(?P<version>.*)-(?P<date>.*)-(?P<hash>.*)$`
	re := regexp.MustCompile(modulePattern)

	modules := make(map[string][]Module)

	for _, moduleString := range modulesArray {
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

func getReplitPath() string {
	currentDir, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	var rootDir string
	if filepath.Base(currentDir) == "replit_modules" {
		rootDir = filepath.Join(currentDir, "../../../")
	} else {
		rootDir = currentDir
	}

	if filepath.Base(rootDir) != "dev_sandbox" {
		fmt.Println("Root folder is not found. Found -> ", rootDir)
		os.Exit(1)
	}

	return filepath.Join(rootDir, ".replit")
}

func getReplitConfig() {
	data, err := os.ReadFile(getReplitPath())
	if err != nil {
		fmt.Println("Error reading TOML file:", err)
		os.Exit(1)
	}

	err = toml.Unmarshal(data, &replitConfig)
	if err != nil {
		fmt.Println("Error parsing TOML:", err)
		os.Exit(1)
	}
}

func readReplitModules() map[string][]Module {
	rawModules, ok := replitConfig["modules"].([]interface{})
	if !ok {
		fmt.Println("Error: 'modules' is invalid key in .replit")
		os.Exit(1)
	}

	var stringModules []string
	for _, value := range rawModules {
		stringModules = append(stringModules, fmt.Sprint(value))
	}

	return parseModules(stringModules)
}

func syncModules(replitModules, githubModules map[string][]Module) {
	var modulesToWrite []string

	for moduleName, modules := range replitModules {
		latestGithubModule := githubModules[moduleName][len(githubModules[moduleName])-1]
		module := modules[0]

		if latestGithubModule.Version > module.Version {
			modulesToWrite = append(modulesToWrite, latestGithubModule.FullName)
			fmt.Println("Update", moduleName, "from", module.Version, "to", latestGithubModule.Version)
		} else {
			modulesToWrite = append(modulesToWrite, module.FullName)
			fmt.Println(moduleName, "is up to date")
		}
	}

	slices.Sort(modulesToWrite)
	replitConfig["modules"] = modulesToWrite
}

func saveReplitConfig() {
	var tomlBuffer bytes.Buffer
	enc := toml.NewEncoder(&tomlBuffer)
	enc.SetArraysMultiline(true)
	enc.SetIndentSymbol("    ")

	err := enc.Encode(replitConfig)
	if err != nil {
		fmt.Println("Error on marshaling config", err)
		os.Exit(1)
	}

	file := getReplitPath()
	// backup config with current time
	backupFile := fmt.Sprintf("%s.%d.bk", file, time.Now().Unix())
	err = os.Rename(file, backupFile)
	if err != nil {
		fmt.Println("Error to backup config", err)
		os.Exit(1)
	}

	err = os.WriteFile(file, tomlBuffer.Bytes(), 0644)
	if err != nil {
		fmt.Println("Error on writing config", err)
		os.Exit(1)
	}

	fmt.Println(".replit is successfully updated")
}
