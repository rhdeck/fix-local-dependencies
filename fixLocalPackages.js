#!/usr/bin/env node
const fixLocalPackages = require("./");
const { spawnSync } = require("child_process");
const { join } = require("path");
const { useYarn } = require("yarnif");
const rimraf = require("rimraf");
if (useYarn()) {
  const { stdout } = spawnSync("yarn", ["cache", "dir"], { encoding: "utf-8" });
  const cacheDir = stdout.toString().trim();
  if (cacheDir) {
    const tmp = join(cacheDir, ".tmp");
    rimraf.sync(tmp);
    console.log("Removed all yarn cache contents from ", tmp);
  } else {
    console.error("No results from yarn cache dir");
  }
}
const out = fixLocalPackages(process.argv[2] || process.cwd());
console.log("All done");
