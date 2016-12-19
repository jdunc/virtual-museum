
exports.up = function(knex, Promise) {
  return knex.schema.createTable("artists", function(table) {
    table.integer("item_id").references('items.id').onDelete('CASCADE');
    table.string("artist").notNullable();
    table.timestamp(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("artists");
};
