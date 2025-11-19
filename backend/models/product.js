const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const productSchema = new Schema({
  pname: { type: String, require: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  status: { type: String, require: true },
});

module.exports = model("products", productSchema);
