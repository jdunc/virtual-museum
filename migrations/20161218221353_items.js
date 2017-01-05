
exports.up = function(knex, Promise) {
  return knex.schema.createTable("items", function(table) {
    table.increments("id").primary();
    table.string("name").notNullable().defaultTo('-');
    table.string("type").notNullable().defaultTo('-');
    table.string("artist_name").notNullable().defaultTo('-');
    table.string("culture").notNullable().defaultTo('-');
    table.string("collection").notNullable().defaultTo('-');
    table.string("story").notNullable().defaultTo('-');
    table.string("description").notNullable().defaultTo('-');
    table.string("additional").notNullable().defaultTo('-');
    table.string("dimensions").notNullable().defaultTo('-');
    table.string("location").notNullable().defaultTo('-');
    table.string("provenance").notNullable().defaultTo('-');
    table.string("primary_image").notNullable().defaultTo('-');
    table.timestamp(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("items");
};
