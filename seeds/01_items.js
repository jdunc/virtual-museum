const data = require('../config/items.js');

exports.seed = function seed(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
  .then(() => knex.raw("ALTER SEQUENCE items_id_seq RESTART WITH 3"))
  .then(() => Promise.all([
      // Inserts seed entries
    knex('items').insert(data.items),
  ]));
};
