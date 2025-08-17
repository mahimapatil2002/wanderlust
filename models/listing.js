const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema ({
    title : {
        type : String,
        required :true,
        },
    description : String,
    image :{
         filename:{
            type: String,
            default :"listingimage",
            },
         url: {
            type: String,
             default:
                 "https://images.unsplash.com/photo-.1f65520043afaafe654c5504443f675e2170824-b547dae88b97?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
           set: (v) =>
              v === ""
               ? "https://images.unsplash.com/photo-1562170824-b547dae88b97?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
              : v,
         },
        },
    price : Number,
    location : String, 
    country : String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review", 
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});

   

const Listing = mongoose.model("Listing",listingSchema);
 module.exports = Listing;
