const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),
  full_name: String,
  phone_number: String,
  CNIC: String,
  role: String,
  address: String,
  password: String,
  number_of_orders_completed: Number
});

module.exports = mongoose.model("User", userSchema);
