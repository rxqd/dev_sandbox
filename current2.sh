#!/bin/env bash

# abort on nonzero exitstatus
# abort on unbound variable
# don't hide errors within pipes
set -euo pipefail

list_projects() {
	local num=1

	for dir in */; do
		if [[ "$dir" != "current/" && "$dir" != "templates/" ]]; then
			project=$(find "$dir" -mindepth 1 -maxdepth 1 -type d -print -quit 2>/dev/null)

			if [ -n "$project" ]; then
				echo "$num. $dir  ->  $project"
			else
				echo "$num. $dir"
			fi

			((num++))
		fi
	done
}

choose_project() {
	echo "Choose current project:"

	list_projects

	# Get user input for folder selection
	read -p "Select a project folder by number: " choice

	# Validate user input
	if ! [[ "$choice" =~ ^[0-9]+$ ]] || ((choice <= 0)); then
		echo "Invalid choice."
		exit 1
	fi

	# Adjust choice to match zero-based indexing
	((choice--))

	target=$(ls -d */ | sed -n "${choice}p")

	echo "Chosen target is: $target"

	# Remove trailing slash, if any
	target="$PWD/${target%/}"

	# Check if selected folder exists
	if [[ ! -d "$target" ]]; then
		echo "$target is invalid"
		exit 1
	fi

	# Check .replit exists
	if [[ ! -e "$target/.replit" ]]; then
		echo ".replit must exist"
		exit 1
	fi

	# Check run.sh exists
	if [[ ! -e "$target/run.sh" ]]; then
		echo "run.sh must exist"
		exit 1
	fi
}

choose_project

# Remove existing current folder symlink (previous project)
if [[ -L "$PWD/current" ]]; then
	rm "$PWD/current"
fi

# Mount target as new current
ln -s "$target" "$PWD/current"

# Remove existing root .replit
if [[ -L "$PWD/.replit" ]]; then
	rm "$PWD/.replit"
fi

# Mount .replit from target
ln -s "$target/.replit" "$PWD/.replit"

# Remove existing root replit.nix
if [[ -L "$PWD/replit.nix" ]]; then
	rm "$PWD/replit.nix"
fi

if [[ -e "$target/replit.nix" ]]; then
	ln -s "$target/replit.nix" "$PWD/replit.nix"
fi

# Remove existing run.sh
if [[ -L "$PWD/run.sh" ]]; then
	rm "$PWD/run.sh"
fi

# Mount run.sh
ln -s "$target/run.sh" "$PWD/run.sh"
