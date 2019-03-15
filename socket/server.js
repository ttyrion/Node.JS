'use strict';

const fs = require('fs');
const net = require('net');

// const filename = process.argv[2];
// if(!filename) {
//   throw Error('No filename specified.');
// }

const port = 60300;
net.createServer((connectionSock) => {
  console.log(`client ${connectionSock.address().address}:${connectionSock.address().port} connected.`);
  const watchFileName = null;
  //监听连接socket的事件
  connectionSock
  .on('data', (buffer) => {
    console.log(`recv ${buffer}`);
    if(!watchFileName) {
      watchFileName = buffer;
      fs.access(watchFileName, fs.constants.F_OK, (err) => {
        if(err) {
          const log = `${watchFileName} does not exist.\n`;
          console.log(log);
          connectionSock.write(log)
          connectionSock.end();
        } else {
          fs.watch(watchFileName, (eventType, filename) => {
            if(eventType == 'rename') {
              connectionSock.write(`${watchFileName} has been moved.\n`)
              connectionSock.end();
            } else if(eventType == 'change') {
              connectionSock.write(`${watchFileName} has been changed.\n`)
            }
          });
          console.log(`Now watching ${watchFileName} for changes...`);
        }
      });
      
    }
  })
  .on('close', (err) => {
    //console.log(`${connectionSock.address().address}:${connectionSock.address().port} closed.`);
    console.log('client closed.');
  });
})
.listen(port, () => {
  console.log(`Listening on port ${port}`);
});