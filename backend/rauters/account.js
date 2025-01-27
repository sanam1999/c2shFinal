
const express = require('express');
 const router = express.Router({mergeParams: true});
 const wrapAsync = require("../utils/warpAsync.js")
 const { isAuthenticated,isboarMember,isAdmin } = require('../utils/Middleware.js');
const { accountGet, transaction, promotionGet, promotionPost, promotionPut, promotioncommunityMemberGet } = require("../Controller/account.js")
 

router.route('/')
    .get( isAuthenticated,isboarMember, wrapAsync(accountGet))
    .post( isAdmin ,wrapAsync(transaction))
    
router.route('/communityMember')
    .post(isAdmin, wrapAsync(promotioncommunityMemberGet))
    

   
    
router.route('/promotion')
    .get(isAuthenticated,isboarMember, wrapAsync( promotionGet))
    .post(isAdmin,wrapAsync(promotionPost))
    .put(isAdmin,wrapAsync(promotionPut));
    

    
module.exports = router;