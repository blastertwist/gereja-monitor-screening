
exports.up = function (knex) {
    return knex.schema
        .createTable("routes_authorizations", (table) => {
            table.uuid("id").primary();
            table.string("path").notNullable().unique();
            table.json("authorized_ids");
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("routes_authorizations")
};
