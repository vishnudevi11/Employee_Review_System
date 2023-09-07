// To Make router and require admin-controller to call function 
// It play the Major role of Admin's to set review,to view the employee,add employee,delete employee.


const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController=require('../controller/admin_controller');

//Assign the work to the employee
router.get('/assignWork' , passport.checkAuthentication , adminController.assignWork);
// This will help to view the employee
router.get('/view-employee' , passport.checkAuthentication , adminController.showEmployeeList);
// It is used to set the reviews 
router.post('/setReviewes' , passport.checkAuthentication , adminController.setReviewrAndReviewe);
// This router will make the  new Admin
router.post('/newAdmin' , passport.checkAuthentication , adminController.newAdmin);
// To Delete the employee
router.get('/deleteEmployee/:id', passport.checkAuthentication , adminController.deleteEmployee);
// To add the employee
router.get('/add-employee' , passport.checkAuthentication , adminController.addEmployee);

module.exports = router;