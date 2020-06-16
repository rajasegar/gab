'use strict';

const fs = require('fs');

module.exports = function (name, data) {
  // create the workflows directory if it is not there
  fs.access('.github/workflows', fs.constants.F_OK, (err) => {
    if (err && err.code === 'ENOENT') {
      console.log('Creating directory `.github/workflows` ...');
      fs.mkdirSync('.github/workflows', { recursive: true });
    }
    // Write file
    fs.writeFile(`.github/workflows/${name}`, data, (err) => {
      if (!err) {
        console.log(`${name} written successfully.`);
      } else {
        console.log(err);
      }
    });
  });
};
