const User = require('../models/user');
const Userinfo = require('../models/userInfo');
const Certificate = require('../models/certificate');

module.exports.distributecertificationGet = async (req, res) => {
    try {
        const user = await User.find({ role: { $ne: "Unverified" } }).populate('userInfo');
         const certificate = await Certificate.find({});
    return res.render("admin/distributecertification.ejs", { user, certificate });
    } catch (err) {
        console.error(err);
        req.flash("error", "Error fetching templates.");
        return res.redirect("/error");
    }
};


module.exports.distributecertificationPost = async (req, res) => {
    try {
        const { certificateId, selectedUsers } = req.body;
        let userdata = [];
      for (const userId of selectedUsers) {
            
            const certificate = await Certificate.findOne({
                _id: certificateId,
                'user.user': userId 
            });

            if (!certificate) {  
                const combinedString = certificateId + "?" + userId; 
                let qrcode = `${process.env.baseurl}admin/verifycertificate?code=${combinedString}`;
                userdata.push({
                    userId: userId,
                    qrcode: qrcode
                });

                
                await Certificate.findByIdAndUpdate(
                    certificateId,
                    {
                        $push: {
                            user: {
                                user: userId,
                                qrcode: qrcode 
                            }
                        }
                    },
                    { new: true } 
                );
            }
        }

        
        res.status(200).json({ success: 'Certificate distributed successfully!', userdata });
    } catch (err) {
        console.error(err);
        req.flash("error", "Error uploading template.");
        return res.redirect("/error");
    }
};


module.exports.addcertification = async (req, res) => {


    try {
        const { title, description, date } = req.body;

        const newCertification = new Certificate({
            title,
            description,
            date,
        });

        await newCertification.save();

    
        res.redirect('/admin/distributecertification');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error adding certification');
    }
};

module.exports.certificatedetails = async (req, res) => {
    try{
 const certificate = await Certificate.findById(req.params.id)
   .populate({
       path: 'user.user', 
       model: 'User',
       populate: {
           path: 'userInfo', 
           model: 'UserInfo',
       },
   });

if (!certificate) {
   req.flash("error", "Invalid Id");
   return res.redirect('/admin/distributecertification');
} 
     return res.render("admin/certificatedetails.ejs", { certificate });
    } catch (err) {
        console.error(err);
        req.flash("error", "Error fetching templates.");
        return res.redirect("/error");
    }
}

module.exports.removeCertificate = async (req, res) => {
    try {
        const { uid, cid } = req.query;

    await Certificate.findByIdAndUpdate(
            cid,
            { $pull: { user: { _id: uid } } },
            { new: true }
        );
        res.status(200).json({ message: 'Certificate deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting certificate');
    }
};

module.exports.verifyCertificate = async (req, res) => {
    let user, status,certificate;
    try {
        const { code } = req.query;
       

      

            const [cid, uid] = code.split('?');
            if(cid && uid){
                certificate = await Certificate.findOne({
                    _id: cid,
                    'user.user': uid
                });
            }
             

           

            if (certificate) {
                user = await User.findById(uid).populate('userInfo');
                status = "Verified";

                certificate.user = certificate.user.find((user) => user.user == uid) || {};
            } else {
                status = "Not a valid certificate";
            }
       

        res.render('home/certificateVerified', { certificate, user, status });
    } catch (err) {
        console.error(err);
        req.flash("error", "Error verifying certificate.");
        return  res.render('home/certificateVerified', { certificate, user, status });
    }
};


module.exports.deletecertification = async (req, res) => {
    try {
        const { id } = req.params; 
        await Certificate.findByIdAndDelete(id);
        res.redirect('/admin/distributecertification')
    } catch (err) {
        console.error(err);
        req.flash("error", "Error generating certificate.");
        return res.redirect("/error");
    }
};