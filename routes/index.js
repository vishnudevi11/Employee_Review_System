// This Page is used to redirect the homepage

const express = require('express'); 
const router = express.Router(); 
const homeController=require('../controller/homepage_controller')

console.log(`router is loaded : {200}`);


router.get('/' , homeController.homepage);

// It will request and require the User File to compute
router.use('/users' , require('./users'));
// It will request and require the Admin File to compute
router.use('/admin' , require('./admin'));
// It will request and require the Review File to compute
router.use('/reviews', require('./reviews'));

module.exports = router;