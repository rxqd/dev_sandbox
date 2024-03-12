#!/usr/bin/env bash

current_dir=$(dirname "$(readlink -f "$0")")
node "$current_dir/src/index.js"
