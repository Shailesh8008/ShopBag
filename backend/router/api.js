const apiRouter = require("express").Router();
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");
const { uploads } = require("../middleware/multer");

apiRouter.get("/", (req, res) => {
  res.send("path '/' called.");
});

apiRouter.post("/api/reg", userController.reg);
apiRouter.post("/api/login", userController.login);
apiRouter.post(
  "/api/addproduct",
  uploads.single("pimage"),
  adminController.addproduct
);
apiRouter.get("/api/getproducts", adminController.getProducts);
apiRouter.delete("/api/deleteproduct/:pid", adminController.deleteProduct);
apiRouter.get("/api/getproduct/:pid", adminController.getOneProduct);
apiRouter.post("/api/editproduct/:pid", adminController.editProduct);

module.exports = apiRouter;
