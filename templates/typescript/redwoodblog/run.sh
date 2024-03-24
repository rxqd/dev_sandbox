#!/usr/bin/env bash

current_dir=$(dirname "$(readlink -f "$0")")
PWD=$current_dir yarn rw dev
