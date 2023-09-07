// To Make router and require User-controller to call function 
// It Create the User,Logout from the User
// It is used to Change the forget password

const express = require('express'); 
const router = express.Router(); 
const passport = require('passport');//passport authorization,authentication

// requiring userController
const userController=require('../controller/user_controller')

// Render SignIn and SignUp Page
router.get('/sign-in' , userController.signIn);
router.get('/sign-up' , userController.signUp);

// Create the session for particular user
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);

// Create new user
router.post('/create' , userController.create);

//Logout form  current user
router.get('/sign-out', userController.destroySession);

// Help to render the forget password page, and change the forget passwrod
router.get('/forgetPassword', userController.forgetPasswordPage);
router.post('/forgetPasswordLink' , userController.forgetPasswordLink);

// all the empoyee
router.post('/addEmployee', userController.addEmployee);

router.post('/makeAdmin', userController.makeAdmin);


module.exports = router;
