#!/bin/env bash

if [[ "$1" == "node" ]]; then
  cd nodejs
  node "$2".js $3 $4 # Pass additional arguments if needed
elif [[ "$1" == "rust" ]]; then
  cd rust
  cargo run $2 $3
elif [[ "$1" == "python" ]]; then
  cd python
  python3 "$2".py $3 $4
else
  echo "Invalid language specified."
fi
