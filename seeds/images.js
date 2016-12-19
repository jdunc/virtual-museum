const data = require('../config/images.js');

exports.seed = function seed(knex, Promise) {
  // Deletes ALL existing entries
  return knex('images').del()
  .then(() => Promise.all([
      // Inserts seed entries
    knex('images').insert(data.images),
  ]));
};
