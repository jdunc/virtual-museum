'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/add_images', (req, res, next) =>{
  console.log('add_images');
  res.render('pages/add_images', {
  });
});

module.exports = router;
