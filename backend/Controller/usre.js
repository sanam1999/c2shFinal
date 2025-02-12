const User = require("../models/user");
const UserInfo = require("../models/userInfo");


const { AccountVerification,PostActivationMSG } = require('../ThirdParty/nodemiler.js');
const Token = require('../models/token')


module.exports.signupPost = async (req, res) => {
    try {
     
        let userInfo = new UserInfo();
        userInfo = await userInfo.save();
        const name = req.body.name;
        const email = req.body.username;
        let newuser = new User({
           name: name,
           username: email,
           userInfo: userInfo._id,
        });      
     
    newuser = await User.register(newuser, req.body.password);
        newuser = await newuser.save();
        let token = new Token({  
            Email: req.body.username,
        });
       token = await token.save();
        AccountVerification(token._id, newuser._id, email, name);
        req.flash("success", "A verification email has been sent to your Gmail. Please check and verify your account.");
        res.redirect('/user/login');
    } catch (err) {   
        req.flash("error", `Error during signup: ${err.message}`);
        res.redirect('/user/signup');
    }
}
module.exports.signupGet = (req, res) => {
    res.render("users/signup.ejs");
}
module.exports.loginPost = async (req, res) => {

    req.flash("success", `Welcome, ${req.user.name}!`);
            let url = res.locals.url || '/'
            req.curUserInfo = "dfsafsd";       
           return res.redirect(url);
}
module.exports.loginGet =  (req, res) => {
    res.render("users/login.ejs");
}
module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
           return next(err);
        }
        req.flash("success", "You have successfully logged out.");
res.redirect('/user/login');

    })
}
module.exports.verifid = async (req, res) => {
    try {
        const { userid, token, email,name } = req.query;
       let user =  await User.findByUsername(email);
     
        if (user.accStatus) {
            req.flash("success", "Your account is already verified.");
         return   res.redirect('/user/login');
            
}
console.log( userid, token, email,name)
console.log("1")
        let Tken = await Token.findById(token);
        if (Tken && Tken.Email === email) {
            console.log("2")
            await User.findByIdAndUpdate(userid, { accStatus: true });
            await Token.findByIdAndDelete(Tken._id);
            PostActivationMSG(email,name)
            req.flash("success", "Welcome! Your account has been successfully verified.");

        } else {
            req.flash("error", "Invalid or expired verification token.");
        }
    } catch (err) {
       
        req.flash("error", "This token has expired. Please log in to receive a new verification token.");

    }
 res.redirect('/user/login');

};
// module.exports.loginacc = async (req, res) => {
//     try {
//         if (req.user !== undefined) {
//             let account = await User.findById(req.user._id).populate('userInfo');
//             return res.status(200).json({ name: account.name, img: account.userInfo.img.url });
//         } 
//         return;
//     } catch (err) {
//         console.error(err);
//         req.flash("error", "Error fetching account");
//         return res.redirect("/error");
//     }
// };