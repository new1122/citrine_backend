
require("dotenv").config();
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const auth = require("../middleware/auth");

// Fake PhonePe secret for signature
const MERCHANT_ID = process.env.MYMERCHANTID;
const MERCHANT_KEY = process.env.MYSECRETKEY;

// Create payment order
router.post("/payment/order", auth, async (req, res) => {
    
  try {
    const { amount } = req.body; // amount in paise
    const orderId = `order_${Date.now()}`; // unique order id
    const body = {
      merchantId: MERCHANT_ID,
      merchantOrderId: orderId,
      amount: amount,
      currency: "INR",
      customerId: req.user.user_id,
      redirectUrl: "http://localhost:3000/payment-success",
      redirectMode: "POST"
    };

    // PhonePe requires HMAC SHA256 signature
    const data = JSON.stringify(body);
    const signature = crypto
      .createHmac("sha256", MERCHANT_KEY)
      .update(data)
      .digest("base64");

    res.json({
      paymentData: body,
      signature
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Payment order creation failed");
  }
});

module.exports = router;