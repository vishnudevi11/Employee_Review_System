// include User and Review Schema 
const User = require('../models/user')
const Review = require('../models/review')

// create review controller fumction 
module.exports.newReview = async (req, res) => {

    try {
        //finding the recipient
        let recipient = await User.findById(req.params.id);
        // console.log(req.params.id + " id ");
        if (!recipient) {
            console.log("Recipient is not valid");
            return res.redirect('/');
        }

       //console.log(recipient._id);
        for(let i = 0; i<req.user.userToReview.length ; i++){
            if (req.user.userToReview[i] == recipient.id) {
                
                let deleted = req.user.userToReview.splice(i, 1);
                
                req.user.save();
                //break;
            }
        }

        // take the reviewer and reviewed
        for (let i = 0; i < recipient.reviewRecivedFrom.length; i++){
            if (req.user) {
                if (recipient.reviewRecivedFrom[i] == req.user.id) {
                    req.user.userToReview.pop(i);
                    // recipient.reviewRecivedFrom.save();
                    const new_review = Review.create({
                       reviewer : recipient.id,
                        reviewed: req.user.id,
                        content: req.query.newReview,
                    });
                    // If there is no review
                    if (!new_review) {
                        console.log("Review is not created");
                    }
                    return res.redirect('/');
                }
            } else {
                console.log("user is not loggin");
                req.flash('error' , "Please LogiN yourself !");
                return res.redirect("/users/sign-in");
            }
        }
        return res.redirect('/');
    } catch (err) {
        console.log('error', err);
        return;
   }
}