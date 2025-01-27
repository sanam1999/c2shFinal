const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: [{
        url: String,
        filename: String
    }],
    location: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    date: {
        type: Date
        
    }
});

module.exports = mongoose.model('Event', eventSchema);
