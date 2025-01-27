const mongoose = require('mongoose');
const { ref } = require('joi');
const Revies = require('./review');
const Schema = mongoose.Schema;
const ListingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
      required: true,
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type:Number
    },
    location: {
        type:String
    },
    country: {
        type:String
    },
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:"Revies"
    }],
    owner: {
         type: Schema.Types.ObjectId,
        ref:"User",
    }
})

ListingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        let a =  await Revies.deleteMany({ _id: { $in: listing.reviews }})
    
    }
})

const Listing = mongoose.model("Listing", ListingSchema)

module.exports=Listing
