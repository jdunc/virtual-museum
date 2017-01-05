
exports.up = function(knex, Promise) {
  return knex.schema.createTable("artists-items", function(table) {
    table.integer("artist_id").references('artists.id').onDelete('CASCADE');
    table.integer("item_id").references('items.id').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("artists-items");
};
