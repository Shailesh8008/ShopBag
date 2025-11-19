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
      status: "In Stock",
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
      return res.json({ ok: false, message: "Cannot find any product" });
    }
    return res.json({ ok: true, data: data });
  } catch (error) {
    console.log("Internal server error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    await model.findByIdAndDelete(pid);
    const data = await model.find();
    return res.json({ ok: true, data: data });
  } catch (error) {
    res.json({ ok: false, message: "Internal server error" });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const record = await model.findById(pid);
    if (!record) {
      return res.json({ ok: false, message: "Cannot find product" });
    }
    return res.json({ ok: true, data: record });
  } catch (error) {
    res.json({ ok: false, message: "Internal server error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const { pname, price, category, status } = req.body;
    if (!pname || !price || !category || !status) {
      return res.json({ ok: false, message: "All fields are required" });
    }

    const isUpdated = await model.findByIdAndUpdate(pid, {
      $set: {
        pname: pname,
        price: price,
        category: category,
        status: status,
      },
    });

    if (!isUpdated) {
      return res.json({ ok: false, message: "Cannot update this product" });
    }
    return res.json({ ok: true, message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false, message: "Internal server error" });
  }
};

module.exports = {
  addproduct,
  getProducts,
  deleteProduct,
  getOneProduct,
  editProduct,
};
