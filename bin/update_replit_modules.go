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

var replitConfig map[string]interface{}

func main() 
	modules := getGithubModules()

    getReplitConfig()

	// TODO:
	// search module name in modules from URL,
	// check latest version, update to the latest version

	replitModules := readReplitModules()

	fmt.Println(replitModules)

    var modulesToWrite []string

	for moduleName, module  := range replitModules {
        modulesArray := modules[moduleName]
        latestModule := modulesArray[-1]
        if latestModule.Version > module.Version {
            modulesToWrite = append(modulesToWrite, latestModule.FullName)
            fmt.Println("Update", moduleName, "from", module.Version, "to", latestModule.Version)
            } else {
            modulesToWrite = append(modulesToWrite, module.FullName)
            fmt.Println(moduleName, "is up to date")
            }
	}
   fmt.Println(modulesToWrite)

  replitConfig["modules"] = modulesToWrite

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
    rootDir, err := filepath.Abs(filepath.Dir(os.Getenv("GOMOD")))
    if err != nil {
        log.Fatal(err)
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
	rawModules, ok := replitConfig["modules"].([]string)
	if !ok {
		fmt.Println("Error: 'modules' is invalid key in .replit")
		os.Exit(1)
	}

	return parseModules(rawModules)
}

func saveReplitConfig() {
    data, err := toml.Marshal(replitConfig)
    if err != nil {
        fmt.Println("Error on marshaling config")
        os.Exit(1)
        }

    file := getReplitPath()
    //backup config with current time
    backupFile := file + ".bk" + time.Now().Unix()
    err = os.Rename(file,backupFile)
if err != nil {
    fmt.Println("Error to backup config")
    os.Exit(1)
    }

    err = os.WriteFile(file, data,0644)

    if err != nil {
        fmt.Println("Error on writing config")
        os.Exit(1)
        }

}