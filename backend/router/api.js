const apiRouter = require("express").Router();
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");

apiRouter.get("/", (req, res) => {
  res.send("path '/' called.");
});

apiRouter.post("/api/reg", userController.reg);
apiRouter.post("/api/login", userController.login);
apiRouter.post("/api/addproduct", adminController.addproduct);

module.exports = apiRouter;
