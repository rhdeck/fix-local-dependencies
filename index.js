#!/usr/bin/env node
const { readFileSync } = require("fs");
const { join } = require("path");
const { addDependency, addDevDependency, removeDependency } = require("yarnif");
function fixLocalPackages(path = process.cwd()) {
  let fixedDependencies = [];
  const packagePath = join(path, "package.json");
  const { devDependencies, dependencies } = JSON.parse(
    readFileSync(packagePath, { encoding: "utf8" })
  );
  if (devDependencies)
    Object.entries(devDependencies)
      .filter(([, path]) => path.startsWith(".") || path.startsWith("/"))
      .forEach(([key, path]) => {
        try {
          removeDependency(key);
        } catch (e) {}
        addDevDependency(path, false);
        fixedDependencies.push({ key, path, isDev: true });
      });
  if (dependencies)
    Object.entries(dependencies)
      .filter(([, path]) => path.startsWith(".") || path.startsWith("/"))
      .forEach(([key, path]) => {
        try {
          removeDependency(key);
        } catch (e) {}
        addDependency(path, false);
        fixedDependencies.push({ key, path, isDev: false });
      });
  return fixedDependencies;
}
module.exports = fixLocalPackages;
