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
  const { VIN, make, model, mileage, title } = req.body;
  cars
    .insert({ VIN, make, model, mileage, title })
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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { VIN, make, model, mileage, title } = req.body;
  cars
    .update(id, { VIN, make, model, mileage, title })
    .then(updated => {
      if (updated) {
        cars
          .findById(id)
          .then(car => res.status(200).json(car))
          .catch(err => {
            console.log(err);
            res.status(200).json({ error: "Can't retrieve car" });
          });
      } else {
        res.status(404).json({ error: `Car with id ${id} not found` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "can't update car" });
    });
});
module.exports = router;
