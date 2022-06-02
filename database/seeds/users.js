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

  bcrypt
    .hash(password, saltRounds)
    .then(function (hash) {
      knex("users").insert([
        {
          email: "admin@gmail.com",
          password: hash,
          name: "Admin",
          permission: "all",
          role: "Manager",
          is_active: 1,
        },
      ]);
    })
    .catch((err) => {
      console.log.log("seed error", err);
    });
};
