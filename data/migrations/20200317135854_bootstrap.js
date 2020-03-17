exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    // first: primary key: unique, immutable, generate new ones possible
    tbl.increments(); // or can use VIN(string) for this, whereas increments is integer
    tbl
      .string("VIN", 17)
      .notNullable()
      .unique();
    tbl.string("make");
    tbl.string("model");
    tbl.integer("mileage");
  });
};

exports.down = function(knex) {
  // to undo the schema
  return knex.dropTableIfExists("cars");
};
