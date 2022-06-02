/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  const saltRounds = 10;
  const password = "12345678";
  // Deletes ALL existing entries
  await knex("users").del();
  let pass = await bcrypt.hash(password, saltRounds);

  await knex("users").insert([
    {
      email: "admin@gmail.com",
      password: pass,
      name: "Admin",
      permission: "all",
      role: "Manager",
      is_active: 1,
    },
  ]);
};
