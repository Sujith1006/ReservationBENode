var mongoose = require("mongoose");

var schema = mongoose.Schema;

// schema.path("_id");
var reservation = new schema({
  name: String,
  userId:{ type: schema.Types.ObjectId, ref: "users" },
  dateTime: Date,
  noofguests: Number,
  typeOfFood: String,
});

var Reservation = mongoose.model("reservation", reservation);
module.exports = Reservation;
