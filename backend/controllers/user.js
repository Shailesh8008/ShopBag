const model = require("../models/user");
const queryModel = require("../models/query");
const cartModel = require("../models/cart");
const productModel = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const reg = async (req, res) => {
  try {
    const { fname, lname, email, pass1 } = req.body;

    if (!fname || !email || !pass1) {
      return res.json({
        message: "first name, email or password is/are missing!",
      });
    }

    const isEmailExists = await model.findOne({ email: email });
    if (isEmailExists) {
      return res.json({ ok: false, message: "Email already Exists!" });
    }
    const hashedPassword = await bcrypt.hash(pass1, 10);
    const record = new model({
      fname: fname,
      lname: lname,
      email: email,
      pass: hashedPassword,
    });

    await record.save();
    return res.json({ ok: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, pass } = req.body;

    const emailExists = await model.findOne({ email: email });
    if (!emailExists) {
      return res.json({ ok: false, message: "Email does not exist!" });
    }

    const isPass = await bcrypt.compare(pass, emailExists.pass);
    if (!isPass) {
      return res.json({ ok: false, message: "Invalid Password!" });
    }

    const token = jwt.sign(
      { id: emailExists["_id"] },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );

    return res.json({
      ok: true,
      message: "Login Successful!",
      token,
      data: emailExists["_id"],
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const query = async (req, res) => {
  try {
    const { username, email, query } = req.body;
    if (!username || !email || !query) {
      return res.json({ ok: false, message: "All fields are required" });
    }
    console.log(queryModel.find());
    const record = new queryModel({
      username: username,
      email: email,
      query: query,
    });
    await record.save();
    return res.json({ ok: true, message: "Query Submitted Successfully" });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const userCart = async (req, res) => {
  try {
    const { userId, cartData } = req.body;
    const isCartExists = await cartModel.findOne({ userId });
    if (isCartExists) {
      isCartExists.userId = userId;
      isCartExists.CartItems = cartData;
      await isCartExists.save();
    } else {
      const record = new cartModel({
        userId,
        CartItems: cartData,
      });
      await record.save();
    }
    return res.json({ ok: true });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const getSearchResult = async (req, res) => {
  try {
    const { query } = req.query;
    const rec = await productModel.find({
      pname: { $regex: query, $options: "i" },
      status: "In Stock",
    });
    return res.json({ ok: true, data: rec });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const fetchCart = async (req, res) => {
  try {
    const { id } = req.params;
    const rec = await cartModel.findOne({ userId: id });
    return res.json({ ok: true, data: rec });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

module.exports = { reg, login, query, userCart, getSearchResult, fetchCart };
