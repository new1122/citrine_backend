const userRepo = require("../repositories/userRepository");
const db = require("../config/db"); 

const addUser = async (user) => {
  return await userRepo.createUser(user);
};


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

const registerUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return await userRepo.createUser({
    ...user,
    password: hashedPassword
  });
};

const loginUser = async ({ mobile, password }) => {
  const user = await userRepo.getUserByMobile(mobile);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password"); // ✅ THIS WAS MISSING
  }

  const token = jwt.sign(
    { user_id: user.user_id },
    SECRET,
    { expiresIn: "1d" }
  );

  return { token, user };
};



const getUserById = async (user_id) => {
  const [rows] = await db.query(
    "SELECT name, mobile, address FROM users WHERE user_id = ?",
    [user_id]
  );

  return rows[0];
};

const updateUser = async (user_id, data) => {
  const { name, mobile, address } = data;

  await db.query(
    "UPDATE users SET name = ?, mobile = ?, address = ? WHERE user_id = ?",
    [name, mobile, address, user_id]
  );

  return { message: "User updated successfully" };
};


// const getUserById = (user_id) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "SELECT name, mobile, address FROM users WHERE user_id = ?",
//       [user_id],
//       (err, rows) => {
//         if (err) reject(err);
//         else resolve(rows[0]);
//       }
//     );
//   });
// };

// const updateUser = (user_id, data) => {
//   const { name, mobile, address } = data;
//   return new Promise((resolve, reject) => {
//     db.query(
//       "UPDATE users SET name = ?, mobile = ?, address = ? WHERE user_id = ?",
//       [name, mobile, address, user_id],
//       (err, result) => {
//         if (err) reject(err);
//         else resolve({ message: "User updated successfully" });
//       }
//     );
//   });
// };


module.exports = { addUser, registerUser, loginUser, getUserById, updateUser };