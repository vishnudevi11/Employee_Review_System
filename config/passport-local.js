// Get Authentication using passport

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
},
async function(email, password, done){
    
    let user = await User.findOne({email : email}); //To find User and identifying

    if(!user || user.password != password){
        console.log('Invalid Password');
        return done(null, false);
    }
    return done(null, user);
    
}
));

// Serializing the User.
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// Deserializing the User.
passport.deserializeUser(async function(id, done){
    
    let userId = await User.findById(id);
    if(!userId){
        console.log("Error in config/ passport-local");
        return ;
    } 
    return done(null, userId);
});

// Checking authentication
passport.checkAuthentication = function (req, res, next){
    // If User signed in,then pass the request to the function
    if(req.isAuthenticated()){
        return next();
    }
    // If User not signed in
    return res.redirect('/users/sign-in');
}
// Setting authentication
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // User data is stored in req ,so we are storing data in res
        res.locals.user = req.user
    }
    next();
}

module.exports = passport;