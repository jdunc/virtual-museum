

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/museum', (req, res, next) => {
  knex('items')
  .then((items) => {
    knex('images')
    .then((images) => {
      knex('artists')
      .then((artists) => {
        res.render('pages/museum', {
          data: items,
          data2: images,
          data3: artists,
        });
      });
    });
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/items', (req, res, next) => {
  knex('items')
  .then((items) => {
    res.send(items);
  })
  .catch((err) => {
    next(err);
  });
});

router.get('/museum/:id', (req, res) => {
  knex('items').where('id', req.params.id).first().then((items) => {
    // res.send(items);
    res.render('pages/items', {
      data: items
    });
    console.log('count',items.count);
    var newCount = items.count + 1;
    knex('items').where('id', req.params.id).update({count: newCount})
    .returning('*').then((items2) => {
      console.log(items2);
    });
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
  .returning('*').then((items) => {
    res.send(items[0]);
  });
});

router.patch('/items/:id', (req, res) => {
  knex('items').where('id', req.params.id).update(req.body)
  .returning('*').then((items) => {
    res.send(items[0]);
  });
});

router.delete('/items/:id', (req, res) => {
  knex('items').where('id', req.params.id).first().then((item) => {
    knex('items').where('id', req.params.id).del().then(() => {
      delete item.id;
      res.send(item);
    });
  });
});

module.exports = router;
