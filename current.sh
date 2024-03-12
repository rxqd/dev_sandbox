#!/bin/env bash

if [[ ! -e "$1" ]]; then
  echo "$1 does not exist"
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

if [[ -L "run.sh" ]]; then 
  rm "run.sh"
fi

if [[ -e "current/run.sh" ]]; then
  ln -s "current/run.sh" "run.sh"
fi
