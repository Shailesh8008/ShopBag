const model = require("../models/user");

const reg = async (req, res) => {
  try {
    const { fname, lname, email, pass1 } = req.body;

    if (!fname || !email || !pass1) {
      return res.json({
        message: "first name, email or password is/are missing!",
      });
    }

    // Fix: await the async DB call
    const isEmailExists = await model.findOne({ email: email });
    if (isEmailExists) {
      return res.json({ ok: false, message: "Email already Exists!" });
    }

    const record = new model({
      fname: fname,
      lname: lname,
      email: email,
      pass: pass1,
    });

    await record.save();
    return res.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { reg };
