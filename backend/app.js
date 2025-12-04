const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRouter = require("./router/api");
const connectDB = require("./config/db");
connectDB();
const bcrypt = require("bcrypt");
const userModel = require("./models/user");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/", apiRouter);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const createDefaultAdmin = async () => {
  const isAdminExists = await userModel.findOne({
    email: "shailesh10thd1@gmail.com",
    role: "admin",
  });
  if (isAdminExists) return;
  const hashedPass = await bcrypt.hash(process.env.ADMIN_PASS, 10);
  const rec = new userModel({
    fname: "Shailesh",
    lname: "Sharma",
    email: "shailesh10thd1@gmail.com",
    pass: hashedPass,
    role: "admin",
  });
  await rec.save();
};
createDefaultAdmin();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
