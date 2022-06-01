const knex = require("../config/dbconfig");
const Pagination = require("../utils/pagination");

exports.caravCreate = (req, res) => {
  const obj = req.body;
  if (!obj) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const { car_id, start_at, end_at } = req.body;
  try {
    knex("car_availability")
      .insert([
        {
          car_id: car_id,
          start_at: start_at,
          end_at: end_at,
          is_active: true,
        },
      ])
      .then((data) => {
        res.status(200).json({
          message: "Car Availability successfully created.",
        });
      })
      .catch((e) => {
        res.status(400).json({
          message: "Car Availability has not been created, Data Error",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "Car Availability has not been created, Server Error",
    });
  }
};

exports.carsav = async (req, res) => {
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
    const count = await knex.table("car_availability").count();
    knex
      .select(
        "car_availability.*",
        "cars.id as car_id",
        "cars.model as car_model",
        "cars.brand as car_brand",
        "cars.year as car_year",
        "cars.day_price as car_day_price",
        "cars.geolocation as car_location"
      )
      .from("car_availability")
      .leftJoin("cars", "cars.id", "car_availability.car_id")
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
          message: "cars availability",
          data: response,
        });
      })
      .catch((e) => {
        res.status(400).json({
          message: "failed to fetch cars availability",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "failed to fetch cars availability",
    });
  }
};

exports.carav = (req, res) => {
  try {
    knex;
    knex
      .select(
        "car_availability.*",
        "cars.id as car_id",
        "cars.model as car_model",
        "cars.brand as car_brand",
        "cars.year as car_year",
        "cars.day_price as car_day_price",
        "cars.geolocation as car_location"
      )
      .from("car_availability")
      .leftJoin("cars", "cars.id", "car_availability.car_id")
      .where("car_availability.id", req.params.id)
      .first()
      .then((result) => {
        if (result) {
          res.status(200).json({
            message: "car availability",
            data: result,
          });
        } else {
          res.status(200).json({
            message: "car availability not found",
          });
        }
      })
      .catch((e) => {
        res.status(400).json({
          message: "car availability not found",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "car availability not found",
    });
  }
};

exports.caravDelete = async (req, res) => {
  try {
    knex("car_availability")
      .where("id", req.params.id)
      .del()
      .then((data) => {
        if (data === 0) {
          res.status(200).json({
            message: "car availability not Found!",
          });
        } else {
          res.status(200).json({
            message: "car availability deleted!",
          });
        }
      })
      .catch((e) => {
        res.status(400).json({
          message: "car availability not deleted!",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "car availability not deleted!",
    });
  }
};

exports.caravUpdate = (req, res) => {
  const obj = req.body;
  if (!obj) {
    res.status(400).json({
      message: "Content can not be empty!",
    });
    return;
  }
  const { is_active, start_at, end_at } = req.body;
  try {
    knex("car_availability")
      .where("id", req.params.id)
      .update({
        is_active: is_active,
        start_at: start_at,
        end_at: end_at,
      })
      .then((data) => {
        if (data === 0) {
          res.status(200).json({
            message: "Car availability has not been updated.",
          });
        } else {
          res.status(200).json({
            message: "Car availability successfully updated.",
          });
        }
      })
      .catch((e) => {
        res.status(400).json({
          message: "Car availability has not been updated, Data Error",
        });
      });
  } catch (e) {
    res.status(400).json({
      message: "Car availability has not been created, Server Error",
    });
  }
};
