const cartService = require("../services/cartService");

const addToCart = async (req, res) => {
  try {
    const user_id = req.user.user_id; 
    const { product_id } = req.body;

    const result = await cartService.addItem({
      user_id,
      product_id
    });

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getCart = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await cartService.getCartItems(user_id);

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateQty = async (req, res) => {
  try {
    const result = await cartService.updateItem(
      req.params.id,
      req.body.quantity
    );

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeItem = async (req, res) => {
  try {
    const result = await cartService.deleteItem(req.params.id);

    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addToCart,
  getCart,
  updateQty,
  removeItem
};