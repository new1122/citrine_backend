const productRepo = require("../repositories/productRepository");
const db = require("../config/db");

const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM products");
  return rows;
};

// const fetchAllProducts = async ({ search, category }) => {
//   return await productRepo.getAllProducts({ search, category });
// };


const fetchProductById = async (id) => {
  return await productRepo.getProductById(id);
};

const createProduct = async (product) => {
  return await productRepo.insertProduct(product);
};  

const fetchCategories = async () => {
  try {
    const categories = await productRepo.getCategories(); // returns ['Bathroom']
    console.log("Raw DB result in service:", categories);
    return categories; // <-- RETURN here!
  } catch (err) {
    console.error("Error in fetchCategories:", err);
    throw err;
  }
};


module.exports = {
  fetchProductById,createProduct,
  fetchCategories, getAllProducts
};
