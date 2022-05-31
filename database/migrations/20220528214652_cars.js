exports.up = function (knex) {
  return knex.schema.createTable("cars", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned();
    table.string("brand", 100).notNullable();
    table.string("build", 100).notNullable();
    table.string("year", 100).notNullable();
    table.string("model", 100).notNullable();
    table.decimal("day_price", 60).notNullable();
    table.string("geolocation").notNullable();
    table.boolean("is_featured").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").nullable();
    table.boolean("is_active").defaultTo(true);

    // add foreign keys:
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cars");
};
