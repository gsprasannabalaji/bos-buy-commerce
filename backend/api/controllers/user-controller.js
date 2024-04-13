const userService = require("../services/user-service");

const login = async (req, res) => {
  try {
    const data = await userService?.login(req, res);
    if(data?.status === 400) {
        return res.status(400).json({message: data?.message});
    } 
    res.status(200).json({
      isUserValid: data?.isUserValid,
      userName: data?.userName,
      role: data?.role,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: error?.message || "Error Occured in login service" });
  }
};

const clearCookies = async (req, res) => {
  try {
    const result = await userService?.clearCookies(req, res);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: error?.message || "Error occured in clear cookies" });
  }
};

const checkIsAdminCookie = async (req, res) => {
  try {
    const isAdmin = userService?.isAdminCookie(req?.userRole);
    res.status(200).json({isAdmin});
  } catch (err) {
    res
      .status(500)
      .send({ message: error?.message || "Error occured in validating cookie" });
  }
};

module.exports = {
  login,
  clearCookies,
  checkIsAdminCookie,
};
