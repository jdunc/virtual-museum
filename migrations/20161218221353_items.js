
exports.up = function(knex, Promise) {
  return knex.schema.createTable("items", function(table) {
    table.increments("id").primary();
    table.string("name").notNullable().defaultTo('-');
    table.string("type").notNullable().defaultTo('-');
    table.string("artist_name").notNullable().defaultTo('-');
    table.string("culture").notNullable().defaultTo('-');
    table.string("collection").notNullable().defaultTo('-');
    table.text("story").notNullable().defaultTo('-');
    table.text("description").notNullable().defaultTo('-');
    table.text("additional").notNullable().defaultTo('-');
    table.string("dimensions").notNullable().defaultTo('-');
    table.string("location").notNullable().defaultTo('-');
    table.text("provenance").notNullable().defaultTo('-');
    table.string("primary_image").notNullable().defaultTo('-');
    table.string("reference_id").notNullable().defaultTo('-');
    table.timestamp(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("items");
};
