const model = require("../models/product");
const queryModel = require("../models/query");
const nodemailer = require("nodemailer");
const imageKit = require("../config/imageKit");

const checkAdmin = (req, res) => res.json({ ok: true });

const addproduct = async (req, res) => {
  try {
    const { pname, price, category } = req.body;
    if (!pname || !price || !category || !req.file) {
      return res.json({ ok: false, message: "All fields are required!" });
    }
    const { buffer, originalname } = req.file;

    const uploadImage = await imageKit.upload({
      file: buffer,
      fileName: `${Date.now()}-${originalname}`,
      folder: "/products",
    });

    const record = new model({
      pname: pname,
      price: price,
      category: category,
      status: "In Stock",
      pimage: uploadImage.url,
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
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const getQueries = async (req, res) => {
  try {
    const record = await queryModel.find();
    if (!record) {
      return res.json({ ok: false, message: "No queries" });
    }
    return res.json({ ok: true, data: record });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const deleteQuery = async (req, res) => {
  try {
    const { qid } = req.params;
    await queryModel.findByIdAndDelete(qid);
    const record = await queryModel.find();
    return res.json({ ok: true, data: record });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const getOneQuery = async (req, res) => {
  try {
    const { qid } = req.params;
    const record = await queryModel.findById(qid);
    if (!record) {
      return res.json({ ok: false, message: "Cannot find query" });
    }
    return res.json({ ok: true, data: record });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const updateQuery = async (req, res) => {
  try {
    const { qid } = req.params;
    await queryModel.findByIdAndUpdate(qid, { status: "Seen" });
    const record = await queryModel.find();
    return res.json({ ok: true, data: record });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const queryReply = async (req, res) => {
  try {
    const { qid } = req.params;
    const { to, sub, reply } = req.body;
    if (!to || !sub || !reply) {
      return res.json({ ok: false, message: "All fields are required" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: `"ShopBag" <${process.env.ADMIN_EMAIL}>`,
      to: to,
      subject: sub,
      text: reply,
      html: reply,
    });
    if (!info) {
      return res.json({ ok: false, message: "Cannot sent" });
    }
    await queryModel.findByIdAndUpdate(qid, { status: "Replied" });
    return res.json({ ok: true, message: "Successfully sent" });
  } catch (error) {
    res.json({ ok: false, message: "Internal server error" });
  }
};

module.exports = {
  checkAdmin,
  addproduct,
  getProducts,
  deleteProduct,
  getOneProduct,
  editProduct,
  getQueries,
  deleteQuery,
  getOneQuery,
  updateQuery,
  queryReply,
};
