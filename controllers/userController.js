const knex = require("../config/dbconfig");
const bcrypt = require("bcrypt");
const randtoken = require("jsonwebtoken");
const Pagination = require("../utils/pagination");
const saltRounds = 10;
require("dotenv").config();

exports.userFindByEmail = async (email) => {
  const user = await knex("users").where("email", email);
  return user;
};

exports.userFindById = async (id) => {
  const user = await knex("users").where("id", id).first();
  return user;
};

exports.signup = (req, res) => {
  const obj = req.body;
  if (!obj) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const { name, email, password, permission, role } = req.body;
  try {
    bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        knex("users")
          .insert([
            {
              name: name,
              permission: permission,
              role: role,
              email: email,
              password: hash,
              is_active: true,
            },
          ])
          .then((data) => {
            res.status(200).json({
              message: "User successfully created.",
            });
          })
          .catch((e) => {
            res.status(400).json({
              message: "User has not been created, Data Error",
            });
          });
      })
      .catch((err) => {
        res.status(400).json({
          message: "User has not been created.",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "User has not been created, Server Error",
    });
  }
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  knex
    .select("users.password AS pass", "users.id AS uid")
    .from("users")
    .where("email", email)
    .first()
    .then((data) => {
      if (!data) {
        res.status(401).json({
          message: "User not found.",
        });
      } else {
        bcrypt.compare(password, data.pass).then(function (result) {
          if (result == true) {
            const token = randtoken.sign(
              { _id: data.uid, email: data.email },
              process.env.SECRET
            );
            knex("users")
              .where("id", data.uid)
              .first()
              .update({
                token: token,
              })
              .then((resp) => {
                knex
                  .select()
                  .from("users")
                  .where("id", data.uid)
                  .first()
                  .then((response) => {
                    res.status(200).json({
                      message: "User successfully logged in.",
                      data: response,
                    });
                  })
                  .catch((err) => {
                    res.status(401).json({
                      message: "Unauthorized.",
                    });
                  });
              })
              .catch((err) => {
                res.status(401).json({
                  message: "Unauthorized.",
                });
              });
          } else {
            res.status(401).json({
              message: "Unauthorized.",
            });
          }
        });
      }
    })
    .catch((e) => {
      res.status(401).json({
        message: "Unauthorized.",
      });
    });
};

exports.users = async (req, res) => {
  let { currentPage, itemPerPage } = req.query;
  let itemsLimit, itemsOffset;

  if (currentPage !== "all") {
    currentPage = Number(currentPage) - 1;
    itemPerPage = Number(itemPerPage);
    const { limit, offset } = Pagination.getPagination(
      currentPage,
      itemPerPage
    );
    itemsLimit = limit;
    itemsOffset = offset;
  } else {
    itemsLimit = undefined;
    itemsOffset = 0;
  }
  try {
    const count = await knex.table("users").count();
    knex
      .select()
      .from("users")
      .offset(itemsOffset)
      .limit(itemsLimit)
      .then((result) => {
        let response = Pagination.getPagingData(
          result,
          currentPage,
          itemsLimit,
          count[0]["count(*)"]
        );
        res.status(200).json({
          message: "users",
          data: response,
        });
      })
      .catch((e) => {
        res.status(400).json({
          message: "failed to fetch users",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "failed to fetch users",
    });
  }
};

exports.user = async (req, res) => {
  const user = await knex("users").where("id", req.params.id).first();
  try {
    if (user) {
      res.status(200).json({
        message: "user",
        data: user,
      });
    } else {
      res.status(400).json({
        message: "user not found",
      });
    }
  } catch (e) {
    res.status(400).json({
      message: "user not found",
    });
  }
};

exports.userDelete = async (req, res) => {
  try {
    knex("users")
      .where("id", req.params.id)
      .del()
      .then((data) => {
        if (data === 0) {
          res.status(200).json({
            message: "user not Found!",
          });
        } else {
          res.status(200).json({
            message: "user deleted!",
          });
        }
      })
      .catch((e) => {
        res.status(400).json({
          message: "user not deleted!",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "user not deleted!",
    });
  }
};

exports.userUpdate = (req, res) => {
  const obj = req.body;
  if (!obj) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const { name, permission, role } = req.body;
  try {
    knex("users")
      .where("id", req.params.id)
      .update({
        name: name,
        permission: permission,
        role: role,
      })
      .then((data) => {
        if (data === 0) {
          res.status(200).json({
            message: "User has not been updated.",
          });
        } else {
          res.status(200).json({
            message: "User successfully updated.",
          });
        }
      })
      .catch((e) => {
        res.status(400).json({
          message: "User has not been updated, Data Error",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "User has not been created, Server Error",
    });
  }
};
