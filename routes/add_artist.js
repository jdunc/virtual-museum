'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
var fs = require('fs');

const bodyParser = require('body-parser');


router.get('/add_artist', (req, res, next) =>{
  res.render('pages/add_artist', {
  });
});

router.post('/add_artist', (req, res, next) =>{
  var dir = `./images/artists/${req.body.id}`;
  knex('artists').insert(req.body)
  .returning('*').then((artists) => {
    res.send(artists[0]);
    uploadImage();
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    if (!req.files) {
      res.send('No files were uploaded.');
      return;
    }
    console.log('files:', Object.keys(req.files).length);
    console.log('body:',req.body);
    console.log('directory', dir);
    for (let i = 0; i < Object.keys(req.files).length; i++) {
      console.log(req.files[Object.keys(req.files)[i]]);
      var tempFile = req.files[Object.keys(req.files)[i]];
      tempFile.mv(`${dir}/${req.files[Object.keys(req.files)[i]].name}`, function(err) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          res.render('pages/add_images', {
            data: 'Images Uploaded!',
          });
        }
      });
    }
  });
  console.log('add new artist');
});

router.patch('/add_artist/:id', (req, res) => {
  knex('artists').where('id', req.params.id).update(req.body)
  .returning('*').then((artists) => {
    res.send(artists[0]);
  });
});


module.exports = router;
