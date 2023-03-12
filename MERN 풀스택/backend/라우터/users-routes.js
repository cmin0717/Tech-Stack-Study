const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const controller = require("../컨트롤러/user-control");

router.get("/", controller.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  controller.signUp
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  controller.login
);

module.exports = router;
