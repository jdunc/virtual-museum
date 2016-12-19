const data = require('../config/artists.js');

exports.seed = function seed(knex, Promise) {
  // Deletes ALL existing entries
  return knex('artists').del()
  .then(() => Promise.all([
      // Inserts seed entries
    knex('artists').insert(data.artists),
  ]));
};
