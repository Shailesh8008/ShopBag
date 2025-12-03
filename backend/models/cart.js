const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  CartItems: [],
});

module.exports = model("carts", cartSchema);
