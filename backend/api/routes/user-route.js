const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

const validateEmail = require("../middlewares/validateEmail");
const validatePassword = require("../middlewares/validatePassword");
const authenticateToken = require("../middlewares/authenticateToken");
// Route for user login
router.route('/login').post(validateEmail, validatePassword, userController?.login);
// Route for user signup
router.route('/signup').post(userController?.signup);
// Route to check if user is admin
router?.route("/check-admin").get(authenticateToken, userController?.checkIsAdminCookie);
// Route to clear user cookies
router.route('/clearCookies').get(userController?.clearCookies);

module.exports = router;