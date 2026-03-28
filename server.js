// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api", cartRoutes);

const paymentRoutes = require("./routes/paymentRoutes"); 
app.use("/api", paymentRoutes); 

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/test", (req, res) => {
  res.send("API is working ✅");
});