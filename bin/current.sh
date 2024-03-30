#!/bin/env bash

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

if [[ -L "$ROOT/current" ]]; then
	rm -f "$ROOT/current"
fi

ln -s "$1" "$ROOT/current"

if [[ ! -e "$ROOT/current/.replit" ]]; then
	echo "$1/.replit must exist"
	exit 1
fi

if [[ -L "$ROOT/.replit" ]]; then
	rm -f "$ROOT/.replit"
fi

ln -s "$ROOT/current/.replit" "$ROOT/.replit"

if [[ -L "$ROOT/replit.nix" ]]; then
	rm -f "$ROOT/replit.nix"
fi

if [[ -e "$ROOT/current/replit.nix" ]]; then
	ln -s "$ROOT/current/replit.nix" "$ROOT/replit.nix"
fi
