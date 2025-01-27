const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/warpAsync.js");
const { isAuthenticated,isboarMember,isAdmin } = require('../utils/Middleware.js');
const { distributecertificationGet, distributecertificationPost, addcertification, removeCertificate, certificatedetails, verifyCertificate, deletecertification } = require("../Controller/admin.js");

// Admin routes
router.route('/distributecertification')
    .get(isAuthenticated,isboarMember, distributecertificationGet)  
    .post(isAuthenticated,isAdmin,  wrapAsync(distributecertificationPost)); // Distribute certifications

router.route('/addcertification/')
    .post(isAuthenticated,isAdmin,  wrapAsync(addcertification))  // Add certification
    

router.route('/deletecertification/:id')
    .post(isAuthenticated,isAdmin,  wrapAsync(deletecertification)); // Delete certification

router.route('/remove')
    .post(isAuthenticated,isAdmin, wrapAsync(removeCertificate));

router.route('/certificatedetails/:id')
    .get(isAuthenticated,isboarMember,wrapAsync(certificatedetails));

router.route('/verifycertificate')
    .get(verifyCertificate);

module.exports = router;
