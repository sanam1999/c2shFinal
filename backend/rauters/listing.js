const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/warpAsync.js")
const { isAuthenticated ,isowner,listingvalidate } = require('../utils/Middleware.js'); 
const {about,index,   profileGet,profilePost,contactuspost, editProfile, profileIMGupdate, Subscribe, contactus} = require('../Controller/listing.js')
const { upload } = require("../ThirdParty/cludynaryconfig.js");
// Index route

router.route('/')
    .get(wrapAsync(index))

router.route('/about')
    .get(wrapAsync(about))

router.route('/profile/edit')
    .get(isowner,isAuthenticated, editProfile)
    .post(isAuthenticated, profilePost)
    .put(isowner,isAuthenticated,upload.single('profileImg'), profileIMGupdate)
    

router.route('/Subscribe')
    .post( Subscribe);


// contactus routs
router.route('/contactus')
    .get(contactus)
    .post(contactuspost)


router.route('/profile')
    .get(profileGet)
    .post(isAuthenticated, profilePost);

    
 module.exports = router;