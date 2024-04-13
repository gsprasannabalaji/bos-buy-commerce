const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

const validateEmail = require("../middlewares/validateEmail");
const validatePassword = require("../middlewares/validatePassword");
const authenticateToken = require("../middlewares/authenticateToken");

router.route('/login').post(validateEmail, validatePassword, userController?.login);

router?.route("/check-admin").get(authenticateToken, userController?.checkIsAdminCookie);

module.exports = router;