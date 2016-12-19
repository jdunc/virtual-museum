'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/items/display', (req, res, next) =>{
  knex('items')
  .then((items) => {
    knex('images')
    .then((images) => {
      knex('artists')
      .then((artists) => {
        res.render('pages/items', {
          data: items,
          data2: images,
          data3: artists
        });
      })
    })
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/items', (req, res, next) =>{
  knex('items')
  .then((items) => {
    res.send(items);
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/items/:id', (req, res) => {
  knex('items').where('id', req.params.id).first().then((items) => {
    res.send(items);
  });
});

router.post('/items', (req, res) => {
  console.log('HEADERS', req.headers);
  console.log('getting this!', req.body);
  knex('items').insert(req.body)
  .returning(['id', 'name', 'location', 'dimensions', 'provenance', 'culture']).then((items) => {
    res.send(items[0]);
  });
});

router.patch('/items/:id', (req, res) => {
  knex('items').where('id', req.params.id).update(req.body)
  .returning(['id', 'name', 'location', 'dimensions', 'provenance', 'culture']).then((items) => {
    res.send(items[0]);
  });
});

router.delete('/items/:id', (req, res) => {
  knex('items').where('id', req.params.id).first().then((items) => {
    knex('items').where('id', req.params.id).del().then(() => {
      delete items.id;
      res.send(items);
    });
  });
});

module.exports = router;
