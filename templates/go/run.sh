#!/usr/bin/env bash

current_dir=$(dirname "$(readlink -f "$0")")
go run "$current_dir/src/main.go"
