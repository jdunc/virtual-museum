'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
var fs = require('fs');
const bodyParser = require('body-parser');
router.post('/add_images_action', (req, res, next) =>{
  var dir = './images';
  var sampleFile;
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  if (!req.files) {
      res.send('No files were uploaded.');
      return;
  }
  console.log('files:', Object.keys(req.files).length);
  console.log(req.body.);
  for (let i = 0; i < Object.keys(req.files).length; i++) {
    console.log(req.files[Object.keys(req.files)[i]]);
  }
  // sampleFile = req.files.sampleFile;
  // sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
  //     if (err) {
  //         res.status(500).send(err);
  //     }
  //     else {
  //         res.send('File uploaded!');
  //     }
  // });
  console.log('add_images_action');
  // var tempPath = req.files.file.path,
  //       targetPath = path.resolve('./uploads/image.png');
  // knex('images').insert(req.body)
  // .returning(['id', 'name', 'location', 'dimensions', 'provenance', 'culture']).then((items) => {
  //   res.send(items[0]);
  // });
  res.send(req.body)
});

module.exports = router;
