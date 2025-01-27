const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SubscribeSchema = new Schema({
    Email: {
        type: String,
        required: true,
        unique: true 
    },
});


const Subscribe = mongoose.model('Subscribe', SubscribeSchema);


async function subscribeUser(email) {
    try {
        
        const existingSubscription = await Subscribe.findOne({ Email: email });

        if (existingSubscription) {
            
            return { message: 'Email already subscribed.' };
        }

        
        const newSubscription = new Subscribe({ Email: email });
        await newSubscription.save();

        
        return { message: 'Subscription successful.' };
    } catch (error) {
        throw new Error('An error occurred. Please try again later.');
    }
}


module.exports = {
    Subscribe,
    subscribeUser
};
