const db = require("../data/db.js");

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  findById
};

function get() {
  return db("cars");
}

function getById(id) {
  return db("cars")
    .where({ id })
    .first();
}

function findById(id) {
  return db("cars")
    .where({ id: Number(id) })
    .first();
}
function insert(car) {
  return db("cars")
    .insert(car)
    .then(([id]) => getById(id));
}

function update(id, car) {
  return db("cars")
    .where("id", Number(id))
    .update(car);
}

function remove(id) {
  return db("cars")
    .where("id", Number(id))
    .del();
}
