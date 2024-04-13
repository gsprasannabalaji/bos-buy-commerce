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

const clearCookies = async (req, res) => {
  res.clearCookie("user-creds");
  return { message: "logged out successfully" };
};

const isAdminCookie = (role) => {
    return role === 'admin';
}

module.exports = {
    login,
    clearCookies,
    isAdminCookie
};
