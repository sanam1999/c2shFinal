const User = require("../models/user.js");
const UserInfo = require("../models/userInfo.js");
const Event = require("../models/event.js");
const {Contactus } = require('../ThirdParty/nodemiler.js');
const {isAuthenticated} = require('../utils/Middleware.js')
// const { use } = require("passport");
const {subscribeUser}  = require("../models/Subscribe");
const { deleteImage } = require("../ThirdParty/cludynaryconfig.js");
module.exports.index = async (req, res) => {
    try {
        
        const communityMemberCount = await User.countDocuments({ role: "communityMember" });
        const verifiedCount  = communityMemberCount + await User.countDocuments({ role: "Verified" });
        const eventcount = await Event.countDocuments({});
        const Courses = 0;

        // Fetch users with the "communityMember" role and populate the userInfo
        let userInfo = await User.find({ role: "communityMember" }).populate("userInfo");

      sortedUsers = restructureUserInfo(userInfo, 3)
    
     
        // Send the response (not shown in the original code but assumed)
        res.render("home/home.ejs", { verifiedCount, communityMemberCount, eventcount, Courses, sortedUsers });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
};

// Function to reorder teams based on role priority



// module.exports.create =(req, res) => {
//     res.render("home/new.ejs");
// }

// module.exports.createPost = async (req, res) => {
//     const { title, description, price, location, country } = req.body;
//     const url = req.file.path
//     const filename = req.file.filename;
//     let owner = req.user._id;
//     const newListing = new Listing({ title, description, price, location, country, owner });
//     newListing.image = {url,filename}
//     await newListing.save();
//     req.flash("success", "New post created!");
//     res.redirect('/listings');
// }

// module.exports.showPost =async (req, res) => {
//     const { id } = req.params;
//     const list = await Listing.findById(id)
//         .populate({
//         path: "reviews",
//         populate: {
//             path: "author"
//         },
//         })
//         .populate("owner");
//     if (!list) {
//         req.flash("error", "This post is not available");
//         return res.redirect('/listings');
//     }
    
//     res.render("home/show.ejs", { list });
// }

// module.exports.editPost = async (req, res) => {
//     const { id } = req.params;
//     const list = await Listing.findById(id);
//     if (!list) {
//         req.flash("error", "This post is not available");
//         return res.redirect('/listings');
//     }
//     res.render("home/edit.ejs", { list });
// }

// module.exports.postUpdate = async (req, res) => {
//     const { id } = req.params;
//     let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
//     if (req.file) {
//         const url = req.file.path
//         const filename = req.file.filename;
//         listing.image = { url, filename };
//         await listing.save();
//     }
//     req.flash("success", "Post updated successfully");
//     res.redirect(`/listings/${id}`);
// }
// module.exports.postDelete = async (req, res) => {
//     const { id } = req.params;
    
//     await Listing.findByIdAndDelete(id);
//     req.flash("success", "Post deleted successfully");
//     res.redirect("/listings");
// }

module.exports.about = async (req, res) => {
   try {
        
        const communityMemberCount = await User.countDocuments({ role: "communityMember" });
        const verifiedCount  = communityMemberCount + await User.countDocuments({ role: "Verified" });
        const eventcount = await Event.countDocuments({});
        const Courses = 0;
        let userInfo = await User.find({ role: "communityMember" }).populate("userInfo");
        sortedUsers = restructureUserInfo(userInfo, 100)
        res.render("home/about.ejs", { verifiedCount, communityMemberCount, eventcount, Courses, sortedUsers });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Internal Server Error");
    }
}






function restructureUserInfo(userInfo, size) {
    const rolePriority = [
        "President",
        "Vice President",
        "Secretary",
        "Assistant Secretary",
        "Treasurer",
        "Assistant Treasurer",
        "Presenter",
        "Videographer",
        "Video Editor",
        "Script Writers",
        "Director of Social Media Handling",
        "Assistant Director of Social Media Handling",
        "Editor",
        "Assistant Editor",
        "Head",
        "Content Writers",
        "Head of Creative Animation",
        "Graphic Designers",
        "Event Director",
        "Assistant Event Director",
        "Event Organizing Team Members",
        "Head Team Members",
        "Assistant Team Members"
    ];

    // Create a sorted array based on role priority
    const sortedUsers = [];
  for (const role of rolePriority) {
        // Filter users with the matching role
        for (const user of userInfo) {
            if (user.userInfo && Array.isArray(user.userInfo.teams)) {
                for (const team of user.userInfo.teams) {
                    if (team.roles === role) {
                        sortedUsers.push(user);
                      
                        if (sortedUsers.length === size) {
                       
                            return sortedUsers;
                        }
                    }
                }
            }
        }
    }

    // Log sorted user information


    return sortedUsers; 
}
module.exports.profileGet = async (req, res, next) => {
    let userInf;
    try {
        if (req.query.id) {
            userInf = await User.findById(req.query.id).populate('userInfo');
        }
        else {
            if(isAuthenticated){
                userInf = await User.findById(req.user.id).populate('userInfo');
            }
            
            
        }
        if (!userInf) {
            req.flash("error", "User not found.");
        }
       
    } catch (error) {
        req.flash("error", error.message);
        return next(error); 
    }

res.render("home/profile.ejs", { user: userInf });
};
module.exports.profilePost = async (req, res, next) => {
    try {
        
        await UserInfo.findByIdAndUpdate(req.user.userInfo, {
            ...req.body,
            address: {
                street: req.body.street,
                city: req.body.city,
            },
            socialMedia: {
                linkedin: req.body.linkedin || "",
                facebook: req.body.facebook || "",
                X: req.body.X || "",
            }
        });

        return res.redirect("/profile");
        
    } catch (error) {
        req.flash("error", error.message);
        return next(error);
    }
};
module.exports.profileIMGupdate = async (req, res, next) => {
    try {
       
        if (req.body) {

        
            let user = await User.findById(req.user._id).populate('userInfo');
        
            if (user.userInfo.img.filename !== "1") {
                deleteImage(user.userInfo.img.filename);
            }

            await UserInfo.findByIdAndUpdate(user.userInfo._id, {
                'img.url': '/uploads/profileImg/'+req.file.filename,
                'img.filename': req.file.path,
            });
          
        }
          res.status(200).json({ message: 'Profile image updated successfully.' });
    } catch (error) {
        req.flash("error", error.message);
         res.status(501).json({ message: error.message });
    }
};

module.exports.editProfile = async (req, res, next) => {
    let userInfo;
    try {
    userInfo = await User.findById(req.user._id).populate('userInfo');
        if (userInfo.description ==" ") {
            req.flash("info", "Please complete your profile description.");
        }
    } catch (error) {
        req.flash("error", `Error fetching profile for editing: ${error.message}`);
        return next(error);
    }
    res.render("home/editProfile.ejs", {user: userInfo.userInfo });
};

module.exports.Subscribe = async (req, res) => {
try{
    const msg = await subscribeUser(req.body.email)
 res.status(200).json({ message: msg.message });
  } catch (err) {
    console.error('Error subscribing user:', err.message);
    res.status(500).json({ message: 'Failed to subscribe. Please try again later.' });
  }
   
}
module.exports.contactus = (req, res) => {
  
     res.render("home/contactUs.ejs");
}
module.exports.contactuspost = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        Contactus(name, email, subject, message);
        
       
        res.status(200).json({ message: 'Your message has been sent successfully.' });

    } catch (error) {
       
        res.status(500).json({ message: 'Failed to send message. Please try again later.', error: error.message });
    }
};

