const userController = require("../controllers/UserController");
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/checkAuth", auth, userController.checkAuth);

module.exports = router;
