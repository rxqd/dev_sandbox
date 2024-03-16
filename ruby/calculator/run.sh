#!/usr/bin/env bash

current_dir=$(dirname "$(readlink -f "$0")")

# bundle config set --local gemfile "$current_dir/Gemfile"
bundle config set --local path "$current_dir"
bundle exec ruby "$current_dir/src/main.rb"
