# Sandbox for learning and practice

> The idea is to implement the same thing with different programming languages

## Dev process

### Local machine

Create new project and run it

```bash
$ bash new_project.py <lang> <project_name>
$ bash run.sh
```

Set project as current and run it

```bash
$ bash current.sh <lang>/<project>
$ bash run.sh
```


### Replit

Set project as current and run it

```bash
$ bash current.sh <lang>/<project>
// Press "Replit" play button
// TODO: Use nix script to run on "Replit"
```

`current.sh` 

- symlinks a project folder to the `current`
- symlinks `run.sh`, `.replit`, `replit.nix` to root folder