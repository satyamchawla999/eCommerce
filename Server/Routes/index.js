const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    return res.send("hello")
})

router.use('/user',require('./user'));
router.use('/product',require('./product'));

module.exports = router;