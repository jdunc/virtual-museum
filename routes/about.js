

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/about', (req, res, next) => {
  res.render('pages/about');
  // knex('items')
  // .then((items) => {
  //   knex('images')
  //   .then((images) => {
  //     knex('artists')
  //     .then((artists) => {
  //       res.render('pages/items', {
  //         data: items,
  //         data2: images,
  //         data3: artists
  //       });
  //     })
  //   })
  // })
  // .catch((err) => {
  //   next(err);
  // });
});


module.exports = router;
