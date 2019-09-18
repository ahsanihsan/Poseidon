const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),
  name: String,
  phone_number: String,
  address: String,
  rating: Number,
  isVerified: Boolean,
  longitude: Number,
  latitude: Number
});

module.exports = mongoose.model("Shop", shopSchema);
