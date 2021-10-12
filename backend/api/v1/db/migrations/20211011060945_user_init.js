
exports.up = function (knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.uuid('id').primary();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.timestamps(true, true);
        })
        .createTable('user_profiles', (table) => {
            table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
            table.string('first_name');
            table.string('last_name');
            table.integer('phone_number');
            table.string('address');
            table.timestamps(true, true);
        })
        .createTable('role_types', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.integer('level').notNullable();
        })
        .createTable('user_roles', (table) => {
            table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').unique();
            table.integer('type_id').unsigned().references('id').inTable('role_types').onDelete('CASCADE');
        })
        .then(() => {
            return knex('role_types').insert({
                name: 'User',
                level: 0
            })
        })
        .then(() => {
            return knex('role_types').insert({
                name: 'Administrator',
                level: 10
            })
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('user_profiles')
        .dropTable('user_roles')
        .dropTable('users')
        .dropTable('role_types')
};
