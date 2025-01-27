const express = require('express');
const router = express.Router({mergeParams: true});
const warpAsync = require('../utils/warpAsync');
const passport = require('passport'); 
const {saveURL, isAuthenticated, isActivate,isowner,isLogin ,verified} = require('../utils/Middleware.js')

const { signupGet, signupPost, loginPost, loginGet, logout, verifid} = require('../Controller/usre')
const { upload } = require("../ThirdParty/cludynaryconfig.js");

// Signup route


    
router.route('/signup')
    .get(isLogin,signupGet)
    .post(warpAsync(signupPost));

router.route('/login')
    .post(
        saveURL,
        isActivate,
        verified,
        
    passport.authenticate(
    "local", { 
    failureRedirect: '/user/login', 
        failureFlash: true
    }),
    warpAsync(loginPost)
    )
    .get( isLogin,loginGet);

// Login route



router.route('/verifid',isLogin)
    .get(verifid)

router.get("/logout", logout)

// router.route('/getUserinfo')
//     .get(loginacc);


module.exports = router;