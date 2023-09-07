// This Schema is for User,It will contain basic information of all the user.
// And it contain the reviewer

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name :{
        type : 'String',
        required: true
    },
    email : {
        type : 'String',
        required : true,
        unique : true
    },
    password : {
        type : 'String',
        required : true
    },
    isAdmin : {
        type : 'Boolean',
        required : true
    },
    userToReview : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],

    reviewRecivedFrom: [    
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]
}, 
{
    timestamps : true
}
);

const User = mongoose.model('User' , UserSchema);
module.exports = User;