//Routes for user registration,login and getting users data
const router=require('express').Router();
const userController=require('../controllers/userController');

router.post('/login',userController.login);
router.post('/register',userController.register);


module.exports=router;