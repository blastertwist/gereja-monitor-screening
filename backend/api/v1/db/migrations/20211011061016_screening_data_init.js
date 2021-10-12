
exports.up = function (knex) {
    return knex.schema
        .createTable('screening_datas', (table) => {
            table.uuid('id').primary();
            table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable();
            table.timestamps(true, true);
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('screening_datas')
};
