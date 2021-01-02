#!/usr/bin/env node
const fixLocalPackages = require("./");
const { spawnSync } = require("child_process");
const { join } = require("path");
const { useYarn } = require("yarnif");
const rimraf = require("rimraf");
const { existsSync } = require("fs");
const commander = require("commander");
commander.arguments(["[path]"]);
commander.option("-c --clean", "Clean the temp directory first");
commander.parseAsync(process.argv).then(() => {
  if (commander.clean) {
    if (useYarn()) {
      const { stdout } = spawnSync("yarn", ["cache", "dir"], {
        encoding: "utf-8",
      });
      const cacheDir = stdout.toString().trim();
      if (cacheDir) {
        const tmp = join(cacheDir, ".tmp");
        if (existsSync(tmp)) {
          rimraf.sync(tmp);
          console.log("Removed all yarn cache contents from ", tmp);
        } else console.log("No temp dir at path", tmp);
      } else {
        console.error("No results from yarn cache dir");
      }
    }
  }
  const out = fixLocalPackages(commander.args[0] || process.cwd());
  console.log("All done");
});
