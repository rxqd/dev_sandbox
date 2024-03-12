#!/bin/env bash

if [[ ! -e "$1" ]]; then
  echo "$1 does not exist"
  exit 1
fi

ln -s "$1" current  

if [[ ! -e "current/.replit" ]]; then  # Check if .replit exists within the target
  echo "$1/.replit must exist"
  exit 1
fi

ln -s "current/.replit" ".replit"

if [[ -e "current/replit.nix" ]]; then
  ln -s "current/replit.nix" "replit.nix"
fi
