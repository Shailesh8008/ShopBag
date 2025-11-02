const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const apiRouter = require("./router/api");
const connectDB = require("./config/db");
connectDB();

app.use(cors());
app.use(express.json());
app.use("/", apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
