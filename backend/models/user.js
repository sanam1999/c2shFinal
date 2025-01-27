const { boolean } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['communityMember', 'admin','Verified', 'Unverified'],
        default:'Unverified'
    },
    userInfo: {
        type: Schema.Types.ObjectId,
        ref: 'UserInfo',
    },
    accStatus: {
        type: Boolean,
        default:false
    }
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
