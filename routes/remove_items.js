'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/remove_items', (req, res, next) =>{
  console.log('remove_items');
  res.render('pages/remove_items', {
  });
});

module.exports = router;
