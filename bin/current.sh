#!/usr/bin/env bash

set -euxo pipefail
IFS=$'\n\t'

# Show usage if $1 is empty
if [[ -z "$1" ]]; then
	echo "usage $0 <project path>"
	exit 1
fi

if [[ ! -e "$1" && ! -d "$1" ]]; then
	echo "$1 is invalid"
	exit 1
fi

# Get the absolute path to the directory containing this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

# Set the ROOT variable one level up from the script's location
ROOT="$(dirname "$SCRIPT_DIR")"

rm -f "$ROOT/current"
ln -s "$1" "$ROOT/current"
