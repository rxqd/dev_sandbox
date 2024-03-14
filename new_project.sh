#!/bin/env bash

# Check $1 and $2 are not empty
if [[ -z "$1" || -z "$2" ]]; then
  echo usage "$0 <lang> <project_name>"
  exit 1
fi

cp -r "templates/$1" "$1/$2" && bash current.sh "$1/$2"

