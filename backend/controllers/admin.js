const model = require("../models/product");

const addproduct = async (req, res) => {
  try {
    const { pname, price, category } = req.body;
    if (!pname || !price || !category) {
      return res.json({ ok: false, message: "All fields are required!" });
    }

    const record = new model({
      pname: pname,
      price: price,
      category: category,
    });
    await record.save();
    return res.json({ ok: true, message: "Product added successfully" });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const data = await model.find();
    if (!data) {
      return res.json({ ok: false });
    }
    return res.json({ ok: true, data: data });
  } catch (error) {
    console.log("Internal server error");
  }
};

module.exports = { addproduct, getProducts };
