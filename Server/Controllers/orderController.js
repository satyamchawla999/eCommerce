const Order = require("../Model/orders");;

module.exports.addOrder = async (req, res) => {
    let { coupon } = req.body;
    if(coupon === '') {
        req.body.coupon = "Na"
    }
    try {
        let order = Order.create(req.body);
        return res.status(201).send("order placed");
    } catch (err) {
        console.error(err);
        res.statusMessage = "An error occurred in deleting cart items.";
        return res.status(500).end();
    }
}

module.exports.getOrders = async (req, res) => {
    try {
        const order = await Order.find({});
        console.log(order)
        return res.status(201).send(order);
       
    } catch (err) {
        console.error(err);
        res.statusMessage = "An error occurred in deleting cart items.";
        return res.status(500).end();
    }
}