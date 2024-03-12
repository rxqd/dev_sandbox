#!/bin/env fish

function sandbox_run
  if test $argv[1] = "node"
    cd nodejs
    node (string join " " $argv[2..])  # Adapt for optional arguments
  else if test $argv[1] = "rust"
    cd rust
    cargo run -- (string join " " $argv[2..])
  else if test $argv[1] = "python"
    cd python
    python3 (string join " " $argv[2..])
  else 
    echo "Invalid language specified."
  end
end

sandbox_run $argv