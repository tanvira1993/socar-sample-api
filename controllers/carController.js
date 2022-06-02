const knex = require("../config/dbconfig");
const Pagination = require("../utils/pagination");

exports.carFindById = async (id) => {
  const cars = await knex("cars").where("id", id).first();
  return cars;
};

exports.carCreate = (req, res) => {
  const obj = req.body;
  if (!obj) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const {
    model,
    user_id,
    build,
    brand,
    year,
    day_price,
    geolocation,
    is_featured,
  } = req.body;
  try {
    knex("cars")
      .insert([
        {
          model: model,
          user_id: user_id,
          build: build,
          brand: brand,
          year: year,
          day_price: day_price,
          geolocation: geolocation,
          is_featured: is_featured,
        },
      ])
      .then((data) => {
        res.status(200).json({
          message: "Car successfully created.",
        });
      })
      .catch((e) => {
        res.status(400).json({
          message: "Car has not been created, Data Error",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "Car has not been created, Server Error",
    });
  }
};

exports.cars = async (req, res) => {
  let { currentPage, itemPerPage, dropdown } = req.query;
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
    let availableCar = [];
    if (dropdown === "yes") {
      available = await knex.select("car_id").from("car_availability");
      for (let i = 0; i < available.length; i++) {
        availableCar.push(available[i].car_id);
      }
    }
    const count = await knex.table("cars").count();

    knex
      .select("cars.*", "users.name as owner_name")
      .from("cars")
      .leftJoin("users", "users.id", "cars.user_id")
      .whereNotIn("cars.id", availableCar)
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
          message: "cars",
          data: response,
        });
      })
      .catch((e) => {
        res.status(400).json({
          message: "failed to fetch cars",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "failed to fetch cars",
    });
  }
};

exports.car = (req, res) => {
  try {
    knex
      .select("cars.*", "users.name as owner_name")
      .from("cars")
      .leftJoin("users", "users.id", "cars.user_id")
      .where("cars.id", req.params.id)
      .first()
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "car",
            data: result,
          });
        } else {
          res.status(200).json({
            message: "car not found",
          });
        }
      })
      .catch((e) => {
        res.status(400).json({
          message: "car not found",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "car not found",
    });
  }
};

exports.carDelete = async (req, res) => {
  try {
    knex("cars")
      .where("id", req.params.id)
      .del()
      .then((data) => {
        if (data === 0) {
          res.status(200).json({
            message: "car not Found!",
          });
        } else {
          res.status(200).json({
            message: "car deleted!",
          });
        }
      })
      .catch((e) => {
        res.status(400).json({
          message: "car not deleted!",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "car not deleted!",
    });
  }
};

exports.carUpdate = (req, res) => {
  const obj = req.body;
  if (!obj) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const {
    model,
    build,
    brand,
    year,
    day_price,
    geolocation,
    is_featured,
    user_id,
  } = req.body;
  try {
    knex("cars")
      .where("id", req.params.id)
      .update({
        model: model,
        build: build,
        brand: brand,
        year: year,
        day_price: day_price,
        geolocation: geolocation,
        is_featured: is_featured,
        user_id: user_id,
      })
      .then((data) => {
        if (data === 0) {
          res.status(200).json({
            message: "Car has not been updated.",
          });
        } else {
          res.status(200).json({
            message: "Car successfully updated.",
          });
        }
      })
      .catch((e) => {
        res.status(400).json({
          message: "Car has not been updated, Data Error",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "Car has not been created, Server Error",
    });
  }
};
