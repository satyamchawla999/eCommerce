const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController")


router.post('/sign-up',userController.signUp);
router.post('/sign-in',userController.signIn);
router.post('/add-address',userController.addAddress);
router.post('/get-address',userController.getAddress);
router.post('/add-cart',userController.addCart);
// router.post('/get-cart-items',userController.getCartItems);





module.exports=router;