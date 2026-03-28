const db = require("../config/db");

// const getAllProducts = ({ search, category }) => {
//   return new Promise((resolve, reject) => {
//     let query = "SELECT * FROM products WHERE 1=1";
//     let values = [];

//     // 🔍 Search filter
//     if (search) {
//       query += " AND (product_name LIKE ? OR category LIKE ?)";
//       values.push(`%${search}%`, `%${search}%`);
//     }

//     // 🧵 Category filter
//     if (category && category !== "All") {
//       query += " AND category = ?";
//       values.push(category);
//     }

//     db.query(query, values, (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });
// };

const getAllProducts = async ({ search, category }) => {
  let query = "SELECT * FROM products WHERE 1=1";
  let values = [];

  if (search && search.trim() !== "") {
    query += " AND (product_name LIKE ? OR category LIKE ?)";
    values.push(`%${search}%`, `%${search}%`);
  }

  if (category && category !== "All") {
    query += " AND category = ?";
    values.push(category);
  }

  const [rows] = await db.query(query, values);
  return rows;
};

// const getProductById = (id) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "SELECT product_id, product_name, product_price, product_image, category, product_image2, product_image3, product_image4, product_image5 FROM products WHERE product_id = ?",
//       [id],
//       (err, result) => {
//         if (err) reject(err);
//         else resolve(result[0]); // single product
//       }
//     );
//   });
// };

const getProductById = async (id) => {
  const [rows] = await db.query(
    "SELECT product_id, product_name, product_price, product_image, category, product_image2, product_image3, product_image4, product_image5 FROM products WHERE product_id = ?",
    [id]
  );

  return rows[0];
};

const insertProduct = (product) => {
  return new Promise((resolve, reject) => {
    const { product_name, product_price, product_image, category , product_image2, product_image3, product_image4, product_image5} = product;

    db.query(
      "INSERT INTO products (product_name, product_price, product_image, category, product_image2, product_image3, product_image4, product_image5) VALUES (?, ?, ?, ?, ?,?,?,?)",
      [product_name, product_price, product_image, category, product_image2, product_image3, product_image4, product_image5],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

}
const getCategories = async () => {
  try {
    const [rows] = await db.query("SELECT DISTINCT category FROM products");
    console.log("DB query result:", rows);
    return rows.map(row => row.category);
  } catch (err) {
    console.error("DB query error:", err);
    throw err;
  }
};

module.exports = {
  getAllProducts,
  getProductById, insertProduct,
  getCategories
};
