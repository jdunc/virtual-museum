
exports.up = function(knex, Promise) {
  return knex.schema.createTable("artists", function(table) {
    table.increments("id").primary();
    table.string("artist_name").notNullable();
    table.string("brief").notNullable().defaultTo('-');
    table.string("description").notNullable().defaultTo('-');
    table.string("community").notNullable().defaultTo('-');
    table.timestamp(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("artists");
};
