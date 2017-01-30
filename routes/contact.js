

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/contact', (req, res, next) => {
  res.render('pages/contact');
});


module.exports = router;
