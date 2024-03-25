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

if [[ -L current ]]; then 
  rm current
fi

ln -s "$1" current  

if [[ ! -e "current/.replit" ]]; then
  echo "$1/.replit must exist"
  exit 1
fi

if [[ -L ".replit" ]]; then 
  rm ".replit"
fi

ln -s "current/.replit" ".replit"


if [[ -L "replit.nix" ]]; then 
  rm "replit.nix"
fi

if [[ -e "current/replit.nix" ]]; then
  ln -s "current/replit.nix" "replit.nix"
fi
