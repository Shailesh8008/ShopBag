const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema({
  userId: Schema.Types.ObjectId,
  CartItems: [],
});

module.exports = model("carts", cartSchema);
