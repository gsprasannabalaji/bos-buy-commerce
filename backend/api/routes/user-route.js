const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

const validateEmail = require("../middlewares/validateEmail");
const validatePassword = require("../middlewares/validatePassword");
const authenticateToken = require("../middlewares/authenticateToken");

router.route('/login').post(validateEmail, validatePassword, userController?.login);
router.route('/signup').post(userController?.signup);

router?.route("/check-admin").get(authenticateToken, userController?.checkIsAdminCookie);

router.route('/clearCookies').get(userController?.clearCookies);

module.exports = router;