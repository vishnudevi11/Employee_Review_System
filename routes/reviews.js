
// To Make router and require review-controller to call function 
// It set the new review


const express = require('express'); //express
const router = express.Router(); //router
const reviewController=require('../controller/review_controller');


// Set the new review
router.get('/newReview/:id' , reviewController.newReview);

module.exports = router;