const Event = require("../models/event.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.reviewDelete = async (req, res, next) => {
    const { rid, id } = req.params; 
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: rid } });
    await Review.findByIdAndDelete(rid);
    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.reviewCreate =  async (req, res, next) => {
    const result = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    result.reviews.push(newReview);
    await newReview.save();
    await result.save();
    req.flash("success", "Review created Successfully");
    res.redirect(`/listings/${result._id}`);
};

module.exports.feedback = async (req, res) => {
    const { type, postId } = req.body;

    try {
        
        const event = await Event.findById(postId);  

        if (!event) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        
        if (type === 'like') {
            event.likes = (event.likes || 0) + 1;
        } else if (type === 'dislike') {
            event.dislikes = (event.dislikes || 0) + 1;
        }

        await event.save();  

        res.json({ likes: event.likes, dislikes: event.dislikes });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};