
exports.up = function (knex, Promise) {
  return knex.schema.createTable('materials', (table) => {
    table.integer('item_id').references('items.id').onDelete('CASCADE');
    table.string('material').notNullable();
    table.timestamp(true, true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('materials');
};
