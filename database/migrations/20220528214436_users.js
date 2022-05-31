exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("email", 100).unique().notNullable();
    table.string("password").notNullable();
    table.string("token").nullable();
    table.string("name", 100).notNullable();
    // table.integer('country_code').index().references('id').inTable('countries')
    table.string("permission", 50).notNullable();
    table.string("role", 50).notNullable();
    table.timestamp("created_at").defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").nullable();
    table.boolean("is_active").defaultTo(true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
