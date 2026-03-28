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
  // return array of strings
  const result = await productRepo.getCategories();
  return result.map(row => row.category); // [{category:"Electronics"}] → ["Electronics"]
};


module.exports = {
  fetchProductById,createProduct,
  fetchCategories, getAllProducts
};