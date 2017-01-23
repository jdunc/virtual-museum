'use strict';

/* eslint-disable max-len */

exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('user_name')
            .notNullable()
            .defaultTo('');
        table.specificType('hashed_password', 'char(60)')
            .notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
