const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/orderController");

router.post('/add-order',orderController.addOrder);
router.get('/get-orders',orderController.getOrders);


module.exports=router;
