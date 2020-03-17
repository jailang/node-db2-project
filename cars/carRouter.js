const express = require("express");
const cars = require("./carModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>Hi!</h1>");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  cars.getById(id).then(car => {
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).end();
    }
  });
});

router.post("/", (req, res) => {
  const { VIN, make, model, mileage } = req.body;
  cars
    .insert({ VIN, make, model, mileage })
    .then(car => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      console.log("lyn: ", err);
      res.status(500).json({
        error: "error inserting car",
        message: err.message
      });
    });
});
module.exports = router;
