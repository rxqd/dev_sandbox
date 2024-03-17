#!/usr/bin/env bash

current_dir=$(dirname "$(readlink -f "$0")")
python3 "$current_dir/src/main.py"
