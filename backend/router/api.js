const apiRouter = require("express").Router();
const userController = require("../controllers/user");

apiRouter.get("/", (req, res) => {
  res.send("path '/' called.");
});

apiRouter.post("/api/reg", userController.reg);

module.exports = apiRouter;
