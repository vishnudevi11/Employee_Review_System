// This function is used for passing variable to the homepage.
// Checking authorization for fetching the User details.

const User = require('../models/user');
const Review = require('../models/review');

module.exports.homepage = async function(req, res){
    try{
        //Authorization
        if (!req.isAuthenticated()) {
            req.flash('error' , 'Please LogIn !');
            
            return res.redirect('/users/sign-in');
        }
        // Fetching the user and review form
        let user = await User.findById(req.user.id);
        let review = await Review.find({ reviewer: req.user.id });
        // console.log(review);

        
        let recipent = [];
        for(let i = 0; i<user.userToReview.length ; i++){
            let userName = await User.findById(user.userToReview[i]);
            recipent.push(userName);
        }
        // Taking all the necessary imformation of the reviewers and passing it to homePage
        let reviews = [];
        for(let i = 0; i<review.length ; i++){
            let reviewUser = await User.findById(review[i].reviewed);
            // console.log(review); 
            if(reviewUser != null){
                let currUser = {
                    name : reviewUser.name,
                    content : review[i].content
                }
                reviews.push(currUser);
            }
        }

        return res.render('homepage',{
            title : "Employee-Review System  | HOME",
            recipent : recipent,
            reviews : reviews,
            user : user
        });

    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
}
