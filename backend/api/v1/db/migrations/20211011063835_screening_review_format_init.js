
exports.up = function (knex) {
    return knex.schema
        .createTable('screening_review_format', (table) => {
            table.uuid('id').primary()
            table.json('format').notNullable();
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('screening_review_format')
};
