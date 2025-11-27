const model = require("../models/user");
const queryModel = require("../models/query");
const cartModel = require("../models/cart");
const bcrypt = require("bcrypt");

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

    bcrypt.compare(pass, emailExists.pass, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return false;
      }
      return result
        ? res.json({ ok: true, message: "Login Successful!" })
        : res.json({ ok: false, message: "Invalid Password!" });
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
    const { cartData } = req.body;
    const isCartExists = await cartModel.findOne();
    if (isCartExists) {
      await cartModel.findByIdAndUpdate(isCartExists["_id"], {
        CartItems: cartData,
      });
    } else {
      const record = new cartModel({
        CartItems: cartData,
      });
      await record.save();
    }
    return res.json({ ok: true });
  } catch (error) {
    return res.json({ ok: false, message: "Internal server error" });
  }
};

module.exports = { reg, login, query, userCart };
