
exports.up = function (knex, Promise) {
  return knex.schema.createTable('artists', (table) => {
    table.increments('id').primary();
    table.text('artist_name').notNullable();
    table.text('brief').notNullable().defaultTo('-');
    table.text('description').notNullable().defaultTo('-');
    table.text('community').notNullable().defaultTo('-');
    table.timestamp(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('artists');
};
