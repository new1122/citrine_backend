const productService = require("../services/productService");



const getProducts = async (req, res) => {
  try {
    const data = await productService.getAllProducts({});
    res.json(data);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// const getProducts = async (req, res) => {
//   try {
//     const { search, category } = req.query;

//     const data = await productService.fetchAllProducts({
//       search,
//       category
//     });

//     res.json(data);
//   } catch (err) {
//     console.error(err);
// res.status(500).json({
//   error: err.message
// });  }
// };

const getProduct = async (req, res) => {
  try {
    const data = await productService.fetchProductById(req.params.id);
    if (!data) return res.status(404).json({ message: "Product not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getCategories = async (req, res) => {
  try {
    const categories = await productService.fetchCategories();
    res.json(categories);
  } catch (err) {
    console.error("Error in getCategories:", err);
    res.status(500).json({ error: "Server error" });
  }
};
const addProduct = async (req, res) => {
  try {
    const { product_name, product_price, category } = req.body;

    const product_image = req.files?.image
      ? req.files.image[0].path
      : null;

    const product_image2 = req.files?.image2
      ? req.files.image2[0].path
      : null;

    const product_image3 = req.files?.image3
      ? req.files.image3[0].path
      : null;

    const product_image4 = req.files?.image4
      ? req.files.image4[0].path
      : null;

    const product_image5 = req.files?.image5
      ? req.files.image5[0].path
      : null;
    const result = await productService.createProduct({
      product_name,
      product_price,
      category,
      product_image,
      product_image2,
      product_image3,
      product_image4,
      product_image5,
    });
console.log("FILES:", req.files);
    res.status(201).json({ message: "Product added successfully", result });
  } catch (err) {
    console.error(err);
    console.log("ERROR While Uploading the product");
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  getProducts,addProduct,
  getProduct, getCategories
};
