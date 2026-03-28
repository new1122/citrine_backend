const jwt = require("jsonwebtoken");
const SECRET = "mysecretkey";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).send("Access denied");

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, SECRET);
    req.user = verified; // ✅ user_id should be here
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
module.exports = authMiddleware;