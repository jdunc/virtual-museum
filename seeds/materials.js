const data = require('../config/materials.js');

exports.seed = function seed(knex, Promise) {
  // Deletes ALL existing entries
  return knex('materials').del()
  .then(() => Promise.all([
      // Inserts seed entries
    knex('materials').insert(data.materials),
  ]));
};
