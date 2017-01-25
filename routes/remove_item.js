

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/remove_item', (req, res, next) => {
  console.log('remove_item');
  res.render('pages/remove_item', {
  });
});

module.exports = router;
