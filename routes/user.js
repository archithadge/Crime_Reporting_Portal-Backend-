//Routes for user registration,login and getting users data
const router=require('express').Router();
const userController=require('../controllers/userController');
const auth=require('../middlewares/auth');

router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/registercomplaint',auth,userController.registerComplaint);
router.post('/getcomplaints',auth,userController.getComplaints);


module.exports=router;