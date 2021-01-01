#!/usr/bin/env node
const fixLocalPackages = require("./");
const { spawnSync } = require("child_process");
const { join } = require("path");
const { useYarn } = require("yarnif");
const rimraf = require("rimraf");
if (useYarn()) {
  const { stdout } = spawnSync("yarn", ["cache", "dir"]);
  const cacheDir = stdout.toString();
  if (cacheDir) {
    const tmp = join(cacheDir, ".tmp");
    rimraf.sync(tmp);
  }
}
const out = fixLocalPackages(process.argv[2] || process.cwd());
console.log("All done");
