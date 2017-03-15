let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let Busboy = require('busboy');
let _ = require("lodash");
let csv = require('csvtojson')
let test = require('assert');

const USER_HEADERS = require('../services/constants').USER_HEADERS;
const USER_DB_PATH = require('../services/constants').USER_DB_PATH;

/* GET data listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
/* POST CSV listing. */
router.post('/', (req, res, next) => {
  // csv headers
  const fileNameJson = USER_DB_PATH;
  const headerConnectionClose = { 'Connection': 'close' };
  // use busboy to receive and save the import file
  let busboy = new Busboy({ headers: req.headers });
  // path to save the file
  let saveTo;

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    let pathToSave = './public/uploads';
    saveTo = path.join(pathToSave, path.basename(filename));
    // after the csv is ready convert to JSON
    file.on('end', function () {
      csv({
        headers: USER_HEADERS,
        noheader: true
      })
      .fromFile(saveTo)
      .on('end_parsed', (jsonObj) => {
        //save json
        fs.writeFile(fileNameJson, JSON.stringify(jsonObj), 'utf8', function (err) {
          res.writeHead(200, headerConnectionClose);
          res.end(JSON.stringify({imported: jsonObj.length}));
        });
      })
      .on('done', (error) => {
        if(error) {
          res.writeHead(400, headerConnectionClose );
          res.end(JSON.stringify(error));
        } 
      });
    });
    file.pipe(fs.createWriteStream(saveTo));
  });
  return req.pipe(busboy);
});

module.exports = router;
