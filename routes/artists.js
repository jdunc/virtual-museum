

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const fs = require('fs');

router.get('/artists', (req, res, next) => {
  // res.render('pages/index');
  knex('artists')
  .then((artists) => {
    // var newArtists = artists;
    // newArtists.forEach(function(artist){
    //   let path = `images/artists/${artist.id}/`;
    //   var imagePath;
    //   fs.readdir(path, function(err, image) {
    //     imagePath = image[0];
    //     // console.log('imageurl', imagePath);
    //     let fullPath = path + imagePath;
    //     artist.profileImage = fullPath;
    //     console.log('fullpath', fullPath);
    //     return fullPath;
    //   })
    //   .then((url) =>{
    //     console.log('url',url);
    //   });
    // });
    // console.log('in route:',newArtists);
    res.render('pages/artists', {
      data: artists,
    });
  });
});

router.get('/artist/:id', (req, res, next) => {
  knex('artists').where('id', req.params.id).first().then((artist) => {
      // res.send(items);
    res.render('pages/individual_artist', {
      data: artist,
    });
  });
});

module.exports = router;

function readJSON(path) {
  return fs.readFile(path, 'utf8').then(JSON.parse);
}
