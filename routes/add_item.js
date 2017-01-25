

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/add_item', (req, res, next) => {
  console.log('user here');
  res.render('pages/add_item', {
  });
});

module.exports = router;
