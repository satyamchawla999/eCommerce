let User = require("../Model/users");
let Product = require("../Model/products");
// let productController = require("./productController")

module.exports.signUp = async (req, res) => {

  try {
    let user = await User.findOne({ uid: req.body.uid });

    if (!user) {
      user = await User.create(req.body);
      user = await User.findOne({ uid: req.body.uid });
      return res.status(201).send(user);
    } else {
      if (req.body.authProvider === "Google") {
        return res.status(201).send(user);
      } else {
        res.statusMessage = "User Already Exists";
        return res.status(409).end();
      }
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.signIn = async (req, res) => {
  const { uid, email, password } = req.body;

  try {

    let user = await User.findOne({ email: email });

    console.log(user);

    if (user && user.password === password) {
      return res.status(201).send(user);
    } else {
      res.statusMessage = "User Not Present";
      return res.status(409).end();
    }

  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.addAddress = async (req, res) => {
  console.log(req.body)
  try {
    let user = await User.findOneAndUpdate(
      { uid: req.body.uid },
      { $push: { address: req.body } },
      { new: true }
    );
    if (user) {
      return res.status(201).send(user.address);
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.deleteItems = async (req, res) => {
  try {
    let user = await User.findOne({ uid: req.body.uid },);
    if (user) {

      if(req.body.type === "address") {
        user.address.splice(req.body.index,1);
        user.markModified('address');
      } else {
        user.cart.splice(req.body.index,1);
        user.markModified('cart');
      }
      
      await user.save();
      return res.status(201).send("deleted");
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.getAddress = async (req, res) => {
  console.log(req.body)
  try {
    let user = await User.findOne(
      { uid: req.body.uid }
    );
    if (user) {
      return res.status(201).send(user.address);
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.addCart = async (req, res) => {
  let { uid, pUid, quantity, update } = req.body;
  try {
    let user = await User.findOne({ uid: req.body.uid });

    if (user) {
      const cartItemIndex = user.cart.findIndex(item => item.pUid === pUid);
      if (cartItemIndex !== -1) {

        // console.log(typeof (quantity))

        if (update === true) {
          user.cart[cartItemIndex].quantity = parseInt(quantity);

        } else {
          quantity = parseInt(user.cart[cartItemIndex].quantity) + parseInt(quantity);
          user.cart[cartItemIndex].quantity = quantity;
        }


      } else {
        user.cart.push({ pUid, quantity, uid });
      }

      user.markModified('cart');
      await user.save();

      return res.status(201).send(user.cart);
    } else {
      res.statusMessage = 'User Not Found';
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = 'An error occurred while adding to the cart.';
    return res.status(500).end();
  }
};

module.exports.getCartItems = async (req, res) => {
  const { uid } = req.body;
  try {
    let user = await User.findOne({ uid: uid });

    if (user) {

      let cart = [];

      for (const item of user.cart) {
        let product = await Product.findOne({ uid: item.pUid });
        if (product) {
          const data = {
            product: product,
            quantity: item.quantity
          };
          cart.push(data);
        }
      }

      return res.status(201).send(cart);
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while finding cart items.";
    return res.status(500).end();
  }
};

module.exports.setUserRole = async (req, res) => {
  const { uid, role } = req.body;
  try {
    let user = await User.findOne({ uid: uid });

    if (user) {

      user.role = role;
      user.markModified('role');
      await user.save();

      return res.status(201).send(user.role);
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while finding cart items.";
    return res.status(500).end();
  }
};

module.exports.emptyCart = async (req, res) => {
  const { uid} = req.body;
  try {
    let user = await User.findOne({ uid: uid });

    if (user) {

      user.cart = [];
      user.markModified('cart');
      await user.save();

      return res.status(201).send("delete");
    } else {
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred in deleting cart items.";
    return res.status(500).end();
  }
};