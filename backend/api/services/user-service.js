const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User?.findOne({ email: email });
  if (!user) {
    return { status: 400, message: "User not found" };
  }
  const isMatch = await bcrypt?.compare(password, user?.password);
  if (!isMatch) {
    return { status: 400, message: "Invalid password", isUserValid: false };
  }
  const token = jwt?.sign(
    { userName: user?.userName, email: user?.email, role: user?.type },
    process.env.JWT_SECRET_KEY
  );
  res.cookie("user-creds", token, { httpOnly: true });
  return {
    isUserValid: isMatch,
    userName: user?.userName,
    role: user?.type,
  };
};

const createUser = async (userData) =>{
  const { username, email, password } = userData;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create a new user with the hashed password
  const user = new User({
    userName: username,
    email,
    password: hashedPassword,
    type: 'customer',
  });

  await user.save();
  return user;
};



const clearCookies = async (req, res) => {
  res.clearCookie("user-creds");
  return { message: "logged out successfully" };
};

const isAdminCookie = (role) => {
    return role === 'admin';
}

module.exports = {
    login,
    createUser,
    clearCookies,
    isAdminCookie
};
