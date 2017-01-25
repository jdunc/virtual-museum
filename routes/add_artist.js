

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const fs = require('fs');

const bodyParser = require('body-parser');


router.get('/add_artist', (req, res, next) => {
  res.render('pages/add_artist', {
  });
});

router.post('/add_artist', (req, res, next) => {
  // var formInfo = {};
  console.log('body', req.body);
  console.log('files:', Object.keys(req.files).length);
  console.log(req.files[Object.keys(req.files)[0]]);
  // console.log('files:',req.body.file);
  if (req.files === undefined) {
    knex('artists').insert(req.body)
      .returning('*').then((artists) => {
        const response = {};
        response.artist = artists[0];
        response.file = 'No files were uploaded.';
        console.log(res.artist);
        res.status(200);
        res.send(response);
      });
  } else if (req.files !== undefined) {
    knex('artists').insert(req.body)
      .returning('*').then((artists) => {
        console.log('artists', artists);
        const dir = `./images/artists/${artists[0].id}`;
        if (!fs.existsSync(dir)) {
          console.log('make directory');
          fs.mkdirSync(dir);
        }
        const response = {};
        response.artist = artists[0];
        const tempFile = req.files[Object.keys(req.files)[0]];
        tempFile.mv(`${dir}/${req.files[Object.keys(req.files)[0]].name}`, (err) => {
          if (err) {
            response.file = 'Error uploading file, please try the edit artist page';
            res.send(response);
          } else {
            response.file = 'File Uploaded!';
            res.render('pages/new_artist', {
              data: response,
            });
            console.log('response', response);
          }
        });
      });
  }
  console.log('add new artist');
});

router.patch('/add_artist/:id', (req, res) => {
  knex('artists').where('id', req.params.id).update(req.body)
  .returning('*').then((artists) => {
    res.send(artists[0]);
  });
});


module.exports = router;
