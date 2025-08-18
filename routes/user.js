const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usersController = require("../controller/users.js")


router.get("/signup",(usersController.renderSignupForm));

//signup
router.post("/signup",wrapAsync (usersController.signup));

//login
router.get("/login",(usersController.renderLoginForm));

router.post("/login", 
    saveRedirectUrl,
    passport.authenticate("local",
        {  failureRedirect: '/login',failureFlash: true  }
    ),
    (usersController.login));

//logout rout
router.get("/logout",(usersController.logout));

module.exports = router;