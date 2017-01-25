
exports.up = function (knex, Promise) {
  return knex.schema.createTable('images', (table) => {
    table.integer('item_id').references('items.id').onDelete('CASCADE');
    table.string('image_url').notNullable();
    table.timestamp(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('images');
};
