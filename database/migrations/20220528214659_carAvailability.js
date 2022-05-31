exports.up = function (knex) {
  return knex.schema.createTable("car_availability", function (table) {
    table.increments("id").primary();
    table.integer("car_id").unsigned();
    table.timestamp("start_at").notNullable();
    table.timestamp("end_at").notNullable();
    table.timestamp("created_at").defaultTo(knex.raw("now()"));
    table.timestamp("updated_at").nullable();
    table.boolean("is_active").defaultTo(true);

    // add foreign keys:
    table.foreign("car_id").references("cars.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("car_availability");
};
