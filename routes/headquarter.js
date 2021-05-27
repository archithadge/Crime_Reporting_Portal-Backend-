//Routes for user registration,login and getting users data
const router=require('express').Router();
const headquarterController=require('../controllers/headquarterController');
const auth=require('../middlewares/auth');

router.post('/login',headquarterController.login);
router.post('/register',headquarterController.register);
// router.post('/addstation',auth,headquarterController.registerComplaint);
// router.post('/getcomplaints',auth,headquarterController.getComplaints);


module.exports=router;