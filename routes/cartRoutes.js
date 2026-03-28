const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");
const auth = require("../middleware/auth");


router.post("/cart", auth, controller.addToCart);
router.get("/cart", auth, controller.getCart);
router.put("/cart/:id", auth, controller.updateQty);
router.delete("/cart/:id", auth, controller.removeItem);

module.exports = router;