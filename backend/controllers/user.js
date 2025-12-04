const model = require("../models/user");
const queryModel = require("../models/query");
const cartModel = require("../models/cart");
const productModel = require("../models/product");
const orderModel = require("../models/order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Razorpay = require("razorpay");

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
      { id: emailExists["_id"], role: emailExists.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      ok: true,
      message: `${
        emailExists.role == "admin" ? "Welcome Admin" : "Login Successfully"
      }`,
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
    const userId = req.user.id;
    const { cartData } = req.body;
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
    const { id } = req.user;
    const rec = await cartModel.findOne({ userId: id });
    return res.json({ ok: true, data: rec });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

const checkout = async (req, res) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  try {
    const { amount, currency, receipt } = req.body;
    const order = await instance.orders.create({
      amount: amount * 100,
      currency,
      receipt,
    });
    if (!order) {
      return res.json({ ok: false, message: "Error creating order" });
    }
    return res.json({ ok: true, data: order });
  } catch (error) {
    res.json({ ok: false, message: "Internal server error" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { amount, userId, orderId, paymentId, signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
    hmac.update(orderId + "|" + paymentId);
    const generateSignature = hmac.digest("hex");
    if (generateSignature === signature) {
      const rec = new orderModel({
        userId,
        orderId,
        paymentId,
        signature,
        amount,
        status: "paid",
      });
      await rec.save();

      return res.json({ ok: true, message: "Payment Success" });
    } else {
      return res.json({ ok: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.json({ ok: false, message: "Internal server error" });
  }
};

module.exports = {
  reg,
  login,
  query,
  userCart,
  getSearchResult,
  fetchCart,
  checkout,
  verifyPayment,
};
