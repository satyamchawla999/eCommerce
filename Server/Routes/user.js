const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController")


router.post('/sign-up',userController.signUp);
router.post('/sign-in',userController.signIn);
router.post('/add-address',userController.addAddress);


module.exports=router;