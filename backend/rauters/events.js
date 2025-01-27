
const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/warpAsync.js")
const { isAuthenticated, isowner, listingvalidate } = require('../utils/Middleware.js'); 
const {eventAdd, eventGet,eventPost,postEdit,deleteIMG,deletePost,postUpdate,blogs} = require("../Controller/event.js")
const warpAsync = require('../utils/warpAsync.js');
const { upload } = require("../ThirdParty/cludynaryconfig.js");


router.route('/')
    .get( wrapAsync(eventGet))
    .post(upload.array('post[image]', 5), eventPost)
    .delete(warpAsync(deletePost))




router.route('/edit')
    .get( wrapAsync(postEdit))
    .patch(deleteIMG)
    .put(upload.array('post[image]', 5),wrapAsync(postUpdate));


    
router.route('/addevent')
   .get(wrapAsync(eventAdd))

router.route('/blogs')
    .get(wrapAsync(blogs))

    
module.exports = router;