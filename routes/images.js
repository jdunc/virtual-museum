'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/images', (req, res, next) =>{
  knex('images')
  .then((images) => {
    res.send(images);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
