const cartRepo = require("../repositories/cartRepository");

const addItem = async (data) => {
  return await cartRepo.addToCart(data);
};

const getCartItems = async (user_id) => {
  return await cartRepo.getCart(user_id);
};

const updateItem = async (cart_id, quantity) => {
  return await cartRepo.updateQty(cart_id, quantity);
};

const deleteItem = async (cart_id) => {
  return await cartRepo.removeItem(cart_id);
};

module.exports = {
  addItem,
  getCartItems,
  updateItem,
  deleteItem
};