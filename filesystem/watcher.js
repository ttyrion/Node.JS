'use strict';

const targetFile = process.argv[2];
if(!targetFile) {
  throw("We need a target file.");
}

const fs = require('fs');

const watchfile = (file) => {
  const spawn = require('child_process').spawn;
  const fileWatcher = fs.watch(file, (eventType, filename) => {
    if(eventType == 'change') {
      const ls = spawn('ls', ['-l', '-h', `${filename}`])
      ls.stdout.pipe(process.stdout);
    } else if(eventType == 'rename') {
      fileWatcher.close();
    }
  })
  .on('close', () => {
    console.log(`Stop watching.`)
  });
}

fs.access(targetFile, fs.constants.F_OK, (err) => {
  if(err) {
    console.log(`${targetFile} does not exist`);
    process.exit(1);
  } else {
    watchfile(targetFile);
    console.log(`Now watching ${targetFile} for changes...`);
  }
});