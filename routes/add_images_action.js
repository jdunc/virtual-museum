'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.post('/add_images_action', (req, res, next) =>{
  console.log('add_images_action');
  res.render('pages/add_images', {
  });
});

module.exports = router;
