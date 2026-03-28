const express = require("express");
const router = express.Router();
//const controller = require("../controllers/productController");
const usercontroller = require("../controllers/userController");
const productController = require("../controllers/productController");
const uploadMultiple = require("../middleware/upload");
const authenticateToken = require("../middleware/auth");
console.log("✅ productRoutes loaded");
router.get("/products", productController.getProducts);
// router.get("/products", (req, res) => {
//   console.log("🔥 /api/products hit");
//   res.send("Products route working");
// });
router.get("/products/:id", productController.getProduct);
router.post("/users", usercontroller.createUser);
router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);
router.post("/products", uploadMultiple, productController.addProduct);
router.get("/categories", productController.getCategories);
router.get("/user", authenticateToken, usercontroller.getUser);
router.put("/user", authenticateToken, usercontroller.updateUser);

module.exports = router;