const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    user: [{
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        qrcode: { 
            type: String, 
            required: true 
        }
    }]
});

module.exports = mongoose.model('Certificate', certificateSchema);
