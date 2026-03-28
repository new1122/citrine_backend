const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const result = await userService.addUser(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};


const register = async (req, res) => {
  try {

    console.log("Incoming Data:", req.body);

    const result = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message || err || "Registration failed"
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    res.json(result);
  } catch (err) {
 res.status(401).json({
      error: err.message
    });
    }
};

const getUser = async (req, res) => {
  try {
    const user_id = req.user.user_id; // assuming you have JWT middleware
    const result = await userService.getUserById(user_id);
    res.json(result);
  } catch (err) {
    console.error("getUser error:", err);
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const { name, mobile, address } = req.body;
    const result = await userService.updateUser(user_id, { name, mobile, address });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = { createUser, register, login, getUser, updateUser };