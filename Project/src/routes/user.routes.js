const express = require('express');
const { registerUser, loginUser, logOutUser } = require('../controllers/user.controller.js');
const router = express.Router();
const {upload} = require('../middlewares/multer.middleware.js');
const verifyJWT = require('../middlewares/auth.middleware.js');

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    registerUser);

router.route("/login").post(loginUser)

//secure route
router.route("/logout").post(verifyJWT, logOutUser)

module.exports = router

