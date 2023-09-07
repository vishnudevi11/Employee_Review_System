// This Schema is for review, it will contain the review,reviewer and the reviewed.

const mongoose = require('mongoose');
const reviewSchema = mongoose.Schema({
    content : {
        type : 'String',
        require : true
    },
    reviewer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    reviewed : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},
{
    timestamps: true,
}
);
const Review = mongoose.model('Review' , reviewSchema);
module.exports = Review;