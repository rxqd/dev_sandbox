#!/usr/bin/env bash

current_dir=$(dirname "$(readlink -f "$0")")
PYTHONPATH=$current_dir python3 -m pytest
