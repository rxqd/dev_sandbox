#!/usr/bin/env bash

# abort on nonzero exitstatus
# abort on unbound variable
# don't hide errors within pipes
set -euo pipefail

current_dir=$(dirname "$(readlink -f "$0")")

yarn --cwd="$current_dir" rw dev
