const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
  _id: new mongoose.Schema.Types.ObjectId(),
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, default: 0 },
  isVerified: Boolean,
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  shop_registered_by: String
});

module.exports = mongoose.model("Shop", shopSchema);
