let User = require("../Model/users");

module.exports.signUp = async (req, res) => {

  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      user = await User.create(req.body);
      return res.status(201).send("User Created Successfully!");
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
    console.log("user", user);
    if (user) {
      console.log(user);
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
  console.log(req.body);
  const { uid, pUid, quantity } = req.body;
  try {
    let user = await User.findOne({ uid: req.body.uid });

    if (user) {
      // Check if the cart item already exists
      const cartItem = user.cart.find(item => item.pUid === pUid);
      if (cartItem) {
        // Update the quantity of the existing cart item
        cartItem.quantity += quantity;
      } else {
        // Add the new cart item
        user.cart.push(req.body);
      }

      await user.save(); // Save the updated user
      console.log(user.cart);

      return res.status(201).send(user.cart);
    } else {
      res.statusMessage = "User Not Found";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while adding to the cart.";
    return res.status(500).end();
  }
};

