# fix-local-dependencies

Scans your `package.json` for dependencies marked as from the local file system (e.g. `../../lib/mylib`), removes them, and updates them.

## Usage

```bash
npx fix-local-dependencies
# Get a cup of coffee
```

## Use Case

If you are trying to maintain your `yarn.lock` or `package.lock` files, you may find they repeatedly get out of synch with often-updated local depedencies in a monorepo. This tool cleans up on the local dependencies so you don't have to blow away the lock file to work with them.
