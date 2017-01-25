

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/materials', (req, res, next) => {
  knex('materials')
  .then((materials) => {
    res.send(materials);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
