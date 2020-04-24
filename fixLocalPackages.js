#!/usr/bin/env node
const fixLocalPackages = require("./fixLocalPackages");
const out = fixLocalPackages(process.argv[2] || process.cwd());
console.log("All done");
