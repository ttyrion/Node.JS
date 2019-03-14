'use strict';

var targetFile = process.argv[2];
if(!targetFile) {
  throw("We need a target file.");
}

const spawn = require('child_process').spawn;
const fs = require('fs');
fs.watch(targetFile, () => {
  const ls = spawn('ls', ['-l', '-h', `${targetFile}`])
  ls.stdout.pipe(process.stdout);
});

console.log(`Now watching ${targetFile} for changes...`);