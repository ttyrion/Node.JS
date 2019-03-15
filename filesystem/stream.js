'use strict';

require('fs').createReadStream(process.argv[2])
  .on('data', (data) => {
      process.stdout.write(data);
    })
  .on('error', (err) => {
      console.log(`Error: ${err.message}`);
    })