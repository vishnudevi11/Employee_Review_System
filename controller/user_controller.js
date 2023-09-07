const User = require('../models/user'); 

// Rendering SignIn Page
module.exports.signIn = function(req, res){
    return res.render('usersign_in', {
        title : 'Employee-Review System  | Sign-In'
    });
}

module.exports.createSession = async function(req, res){
    // console.log(req.body);
    req.flash('success', 'You are logged In');
    return res.redirect('/');
}

// Rendering SignUp Page
module.exports.signUp = function(req, res){
    return res.render('usersign_up', {
        title : 'Employee-Review System  | SignUp'
    });
}

// Creating New User and display flash message

module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}

// Logout function
module.exports.destroySession = function (req, res, done){
    return req.logout((err) =>{
        if(err){
            return done(err);
        }
        req.flash('success' , 'Logged Out Sucessfully !');
        return res.redirect('/users/sign-in');
    });
    
}

// forgetPassword function

module.exports.forgetPasswordPage = function(req, res){
    return res.render('forgetpassword',{
        title : 'Forget Password'
    });
}

// To update the existing password
module.exports.forgetPasswordLink = async function(req, res){
    let user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.redirect('/users/signUp');
    }
    if(req.body.password == req.body.confirmPassword){
        req.flash('success' , 'Password Changed :)');
        user.password = req.body.password;
        await user.updateOne({password : req.body.password});
        return res.redirect('/users/sign-in');
    }
    return res.redirect('back');
}

// It is add Employee function and redirect to employee page

module.exports.addEmployee = async function(req, res){
    if(req.body.password != req.body.confirmPassword){
        req.flash('error' , 'Password should be equal to Confirm Password');
        return res.redirect('back');
    }
    let user = await User.findOne({email : req.body.email});
    if(!user){
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            isAdmin : false
        });
        
        return res.redirect('/admin/view-employee');
    }
    return res.redirect('back');
}

// This function is used to make a New Admin

module.exports.makeAdmin = async function(req, res){
    try {
        if (req.body.admin_password == 'ers') {
            let user = await User.findById(req.user.id );
            user.isAdmin = true;
            user.save();
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
        
    } catch (error) {
        console.log('Error', error);
        return;
    }
}
