const db = require("../config/db");


const createUser = async (user) => {
  const { name, mobile, address, email, password } = user;

  const [result] = await db.query(
    "INSERT INTO users (name, mobile, address, email, password) VALUES (?, ?, ?, ?, ?)",
    [name, mobile, address, email, password]
  );

  return result;
};

const getUserByMobile = async (mobile) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE mobile = ?",
    [mobile]
  );

  return rows[0];
};


// const createUser = (user) => {
//   return new Promise((resolve, reject) => {
//     const { mobile, password } = user;

//     db.query(
//       "INSERT INTO users (mobile, password) VALUES (?, ?)",
//       [mobile, password],
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       }
//     );
//   });
// };

// const getUserByMobile = (mobile) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "SELECT * FROM users WHERE mobile = ?",
//       [mobile],
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result[0]);
//       }
//     );
//   });
// };

module.exports = { createUser, getUserByMobile };