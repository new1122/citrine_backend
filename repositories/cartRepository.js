const db = require("../config/db");

const addToCart = async ({ user_id, product_id }) => {
  const [result] = await db.query(
    "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)",
    [user_id, product_id]
  );
  return result;
};

const getCart = async (user_id) => {
  const [rows] = await db.query(
    `SELECT c.cart_id, p.product_name, p.product_price, c.quantity 
     FROM cart c 
     JOIN products p ON c.product_id = p.product_id
     WHERE c.user_id = ?`,
    [user_id]
  );
  return rows;
};

const updateQty = async (cart_id, quantity) => {
  const [result] = await db.query(
    "UPDATE cart SET quantity=? WHERE cart_id=?",
    [quantity, cart_id]
  );
  return result;
};

const removeItem = async (cart_id) => {
  const [result] = await db.query(
    "DELETE FROM cart WHERE cart_id=?",
    [cart_id]
  );
  return result;
};

// const addToCart = ({ user_id, product_id }) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)",
//       [user_id, product_id],
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       }
//     );
//   });
// };


// const getCart = (user_id) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       `SELECT c.cart_id, p.product_name, p.product_price, c.quantity 
//        FROM cart c 
//        JOIN products p ON c.product_id = p.product_id
//        WHERE c.user_id = ?`,
//       [user_id],
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       }
//     );
//   });
// };

// const updateQty = (cart_id, quantity) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "UPDATE cart SET quantity=? WHERE cart_id=?",
//       [quantity, cart_id],
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       }
//     );
//   });
// };

// const removeItem = (cart_id) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "DELETE FROM cart WHERE cart_id=?",
//       [cart_id],
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result);
//       }
//     );
//   });
// };

module.exports = { addToCart, getCart, updateQty, removeItem };
