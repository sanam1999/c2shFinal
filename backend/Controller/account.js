const Account = require('../models/account.js');
const User = require('../models/user.js');
const Userinfo = require('../models/userInfo.js')


const { PromotionNotification,PaymentConfirmation ,DepromotionNotification } = require('../ThirdParty/nodemiler.js');

module.exports.transaction = async (req, res) => {
    const transactionType = req.body.type === "deposit" ? "deposit" : "withdrawal";

    try {
        let account = await Account.findOne(); 
        if (!account) {
            const a = new Account({
                balance: 0  
            });
            await a.save(); 
        }
        account = await Account.findOne();    
        if (transactionType === "deposit") {
            await account.addTransaction(transactionType, Number(req.body.amount), req.body.purpose);
            return res.status(200).json({ success: "Depromotion successful." });
            
        } else {
            if (account.balance < req.body.amount) {
                return res.status(200).json({ error: "Insufficient balance for withdrawal" });
                
            }
            await account.addTransaction(transactionType, Number(req.body.amount), req.body.purpose);
            return res.status(200).json({ success: "Withdrawal successful" });
           
        }
       
    } catch (error) {
        console.error("Transaction error:", error);
        return res.status(200).json({ error: "Transaction failed" });
    }
};

module.exports.accountGet = async (req, res) => {
    try {
        const account = await Account.find();
        let acc = 0;
        let details = [];

      

        if (account && account.length > 0) {
            acc = account[0].balance;
            details = account[0].transactions || []; // Ensure details is an array
        }

        return res.render("account/accounts.ejs", { acc, details });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error fetching account');
        return res.redirect('/error');
    }
}



module.exports.promotionGet = async (req, res) => {
    try {
        const users = await User.find({}).populate("userInfo");
        const communitymb = await User.find({ role: "communityMember" }).populate("userInfo");
     
       
        return res.render("account/promotion.ejs", { users , communitymb });
    } catch (err) {
        console.error(err);
        req.flash("error", "Error fetching account");
        return res.redirect("/error");
    }
};

module.exports.promotioncommunityMemberGet = async (req, res) => {
    try {
        
        let { department, role, id, type } = req.body; 
         const user = await User.findOne({ userInfo: id })
      
        let Usero = await Userinfo.findById(id);

        if (!Usero) {
            return res.status(404).json({ error: "User not found." });
        }

        if (type === "remove") {
            let found = false;

            // Iterate through user's teams to find and remove the correct role
            for (const userTeam of Usero.teams) {
                if (userTeam.teamName === department && userTeam.roles === role) {
                    found = true;
                    await userpromotionremove(department, role, id, user);
                    return res.status(200).json({ message: "Depromotion successful." });
                }
            }

            if (!found) {
                return res.status(400).json({ error: `This user is not a ${role} in ${department}.` });
            }

        } else if (type === "save") {
            
            const result = await addTeamToUser(id, department, role ,user);
            
            return res.status(200).json(result);
        } else {
            return res.status(400).json({ error: "Invalid type. Expected 'remove' or 'save'." });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Unexpected error occurred." });
    }
};

module.exports.promotionPost = async (req, res) => {
    try {
        let users;
        if (req.body.type == "role") {
            if (req.body.value == "all") {
                users = await User.find({});
            } else {
                users = await User.find({ role: req.body.value });
            }
        } else {
           const searchValue = req.body.value;
users = await User.find({
    $or: [
        { name: { $regex: searchValue, $options: 'i' } }, 
        { username: { $regex: searchValue, $options: 'i' } }
    ]
});
        }
        return res.json({ users, message: "Promotion completed successfully." });

    } catch (err) {
        console.error(err);
        req.flash("error", "Error fetching account");
        return res.status(500).json({ error: "Unexpected error occurred." });
    }
};

module.exports.promotionPut = async (req, res) => {
    try {
        const { userId, action } = req.body;

        // Validate request payload
        if (!userId || !action) {
            return res.status(400).json({ message: 'Invalid input. userId and action are required.' });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Prevent redundant updates
        if (user.role === action) {
           return res.status(400).json({ error: 'This user already holds this position' });

        }

        let updatedUser;

        switch (action) {
            case "Verified":
            case "Unverified":
                 if (user.role == "Unverified" && action == "Verified") {
                    PaymentConfirmation(user.username, user.name);
                }
                updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { role: action },
                    { new: true }
                );
               
                break;

            case "demotedboardmember":
                if (user.role !== "communityMember") {
                    return res.status(400).json({ error: 'Only communityMember members can be demoted.' });
                }

                updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { role: "Verified" },
                    { new: true }
                );

                
                break;

            case "deletedaccount":
                await User.findByIdAndDelete(userId);
                if (user.userInfo) {
                    await Userinfo.findByIdAndDelete(user.userInfo);
                }
                return res.status(200).json({ message: 'User account deleted successfully.' });

            case "communityMember":
                if (user.role !== "Verified") {
                    return res.status(400).json({ message: 'User must be verified to become a community member.' });
                }
                updatedUser = await User.findByIdAndUpdate(
                    userId,
                    { role: action },
                    { new: true }
                );
            
                break;

            default:
                return res.status(400).json({ error: 'Invalid action specified.' });
        }

        // Return updated user or success message
        return res.status(200).json({
            message: `User role updated to ${action} successfully.`,
            role: updatedUser.role,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'An unexpected error occurred.',
            error: error.message
        });
    }
    
};




async function userpromotionremove(department, role, id, user) {
     
    try {
        const updatedUser = await Userinfo.findByIdAndUpdate(
            id,
            {
                $pull: {
                    teams: { teamName: department, roles: role },
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return { error: "User not found or update failed." };
        }
        DepromotionNotification(user.username, user.name, role ,department)
        return { message: "Depromotion successful." };
    } catch (error) {
        throw new Error('Error during user promotion removal: ' + error.message);
    }
};

async function addTeamToUser(userId, teamName, roles, User) {
    
    try {
        // Check if user already holds the same position
        const user = await Userinfo.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Check if user already has the same department and role
        const existingTeam = user.teams.find(
            team => team.teamName === teamName && team.roles === roles
        );

        if (existingTeam) {
            return { error: "This user already holds this position." }; // Error if user is already part of the team with the same role
        }

        // Add the team if not already assigned
        const updatedUser = await Userinfo.findByIdAndUpdate(
            userId,
            { $push: { teams: { teamName: teamName, roles: roles } } },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('Error updating user with new team.');
        }
PromotionNotification(User.username, User.name,teamName, roles )
        return { message: "Promotion successful."  ,teamName, roles};
    } catch (error) {
        throw new Error('Error adding team to user: ' + error.message);
    }
};
