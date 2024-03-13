# Sandbox for learning and practice

> The idea id to implement the same thing with different programming languages

## Dev process

### Local machine

```bash
$ cp -r templates/<lang> <lang>/<project>
$ bash current.sh <lang>/<project>
$ bash run.sh
```

### Replit

```bash
$ bash current.sh <lang>/<project>
// Press "Replit" play button
// TODO: Use nix script to run on "Replit"
```

`current.sh` 

- symlinks a project folder to the `current`
- symlinks `run.sh`, `.replit`, `replit.nix` to root folder