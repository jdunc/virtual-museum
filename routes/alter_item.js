'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/alter_items', (req, res, next) =>{
  console.log('alter_items');
  res.render('pages/alter_items', {
  });
});

module.exports = router;
