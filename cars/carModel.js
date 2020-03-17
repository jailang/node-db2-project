const db = require("../data/db.js");

module.exports = {
  get,
  getById,
  insert
};

function get() {
  return db("cars");
}

function getById(id) {
  return db("cars")
    .where({ id })
    .first();
}

function insert(car) {
  return db("cars")
    .insert(car)
    .then(([id]) => getById(id));
}
