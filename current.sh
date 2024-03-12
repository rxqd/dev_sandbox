#!/bin/env bash

if [[ ! -e "$1" ]]; then
  echo "$1 does not exist"
  exit 1
fi

ln -sf "$1" current  

if [[ ! -e "current/replit.toml" ]]; then
  echo "$1/replit.toml must exist"
  exit 1
fi

ln -sf "current/replit.toml" ".replit"

if [[ -e "current/replit.nix" ]]; then
  ln -sf "current/replit.nix" "replit.nix"
fi
