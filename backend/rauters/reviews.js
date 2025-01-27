const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/warpAsync.js")
const { isAuthenticated ,isowner,listingvalidate,isboarMember } = require('../utils/Middleware.js'); 
const { eventGet, eventPost,eventDelete,eventAdd } = require('../Controller/event.js')
const multer = require('multer')
const { storage } = require('../ThirdParty/cludynaryconfig.js');
const upload = multer({ storage });
const {feedback} = require('../Controller/reviews.js')


router.route("/feedback")
    .post(wrapAsync(feedback));


module.exports = router;