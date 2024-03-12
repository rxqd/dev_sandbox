#!/bin/env bash

if [[ ! -e "$1" ]]; then
  echo "$1 does not exist"
  exit 1
fi

if [[ -L current ]]; then 
  rm current
fi

ln -s "$1" current  

if [[ ! -e "current/replit.toml" ]]; then
  echo "$1/replit.toml must exist"
  exit 1
fi

if [[ -L ".replit" ]]; then 
  rm ".replit"
fi

ln -s "current/replit.toml" ".replit"


if [[ -L "replit.nix" ]]; then 
  rm "replit.nix"
fi

if [[ -e "current/replit.nix" ]]; then
  ln -sf "current/replit.nix" "replit.nix"
fi
