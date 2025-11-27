const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema({
  CartItems: [],
});

module.exports = model("carts", cartSchema);
