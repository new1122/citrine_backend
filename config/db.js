const mysql = require("mysql2");

// ✅ Create pool (NOT single connection)
const db = mysql.createPool({
  host: "srv1333.hstgr.io",
  // host:"193.203.184.63",
  user: "u294775782_updated",
  password: "AbhishekCitrine@123",
  database: "u294775782_updated",
  port: 3306,
});

// ✅ Test connection safely
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB ERROR:", err.message);
    return reject(err);
  } else {
    console.log("✅ MySQL Connected");
    connection.release();
  }
});

// ✅ HANDLE ERRORS (IMPORTANT)
db.on("error", (err) => {
  console.error("🔥 DB RUNTIME ERROR:", err.message);
});

module.exports = db.promise();