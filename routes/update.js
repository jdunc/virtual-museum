'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/update', (req, res, next) =>{
  console.log('user here');
  res.render('pages/update', {
  });
});

module.exports = router;
