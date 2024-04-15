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

const signup = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      message: 'User Created Successfully'
    });
  } catch (error) {
    const statusCode = error.message === 'User already exists' ? 400 : 500;
    res.status(statusCode).json({ message: 'Error creating the user'});
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
  signup,
  clearCookies,
  checkIsAdminCookie,
};
