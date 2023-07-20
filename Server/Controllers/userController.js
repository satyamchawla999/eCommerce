let User = require("../Model/users");
let Product = require("../Model/products");
// let productController = require("./productController")

module.exports.getUsers = async (req, res) => {
  try {
    let users = await User.find({ role: req.body.role });

    if (users) {
      return res.status(201).send(users);
    } else {
      res.statusMessage = "User Already Exists";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.validateVendor = async (req, res) => {
  try {
    let user = await User.findOne({ uid: req.body.uid });

    if (user) {
      let validate = user.validation;
      user.validation = !validate;
      user.markModified["validation"];
      user.save();
      console.log(user.validation);
      return res.status(201).send("success");
    } else {
      res.statusMessage = "error";
      return res.status(409).end();
    }
  } catch (err) {
    console.error(err);
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};

module.exports.signUp = async (req, res) => {
  try {
    let user = await User.findOne({ uid: req.body.uid });
    let emailFound = false;
    let phoneFound = false;
    if (req.body.email !== "NA") {
      let email = await User.findOne({ email: req.body.email });
      console.log("yes email")
      if (email) emailFound = true;
    }

    if (req.body.phone !== "NA") {
      let phone = await User.findOne({ phone: req.body.phone });
      console.log(phone)
      if (phone) phoneFound = true;
    }


    if (!user && emailFound === false && phoneFound === false) {
      user = await User.create(req.body);
      user = await User.findOne({ uid: req.body.uid });
      return res.status(201).send(user);
    } else {
      if (req.body.authProvider === "Google") {
        if (user.validation === true) {
          return res.status(201).send(user);
        } else {
          res.statusMessage = "Your Account is Disabled";
          return res.status(204).end();
        }

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
  const { email, phone, password } = req.body;

  try {
    let user = {};
    if (email !== "NA") {
      user = await User.findOne({ email: email });
    } else {
      user = await User.findOne({ phone: phone });
    }

    if (user) {
      if (user.password === password) {
        if (user.validation === true) {
          return res.status(201).send(user);
        } else {
          res.statusMessage = "Your Account is Disabled";
          return res.status(204).end();
        }
      } else {
        console.log("Password wrong")
        return res.status(206).end();
      }
    } else {
      console.log("Hello not present")
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
  console.log(req.body);
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
    let user = await User.findOne({ uid: req.body.uid });
    if (user) {
      if (req.body.type === "address") {
        user.address.splice(req.body.index, 1);
        user.markModified("address");
      } else {
        user.cart.splice(req.body.index, 1);
        user.markModified("cart");
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
  console.log(req.body);
  try {
    let user = await User.findOne({ uid: req.body.uid });
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
      const cartItemIndex = user.cart.findIndex((item) => item.pUid === pUid);
      if (cartItemIndex !== -1) {
        // console.log(typeof (quantity))

        if (update === true) {
          user.cart[cartItemIndex].quantity = parseInt(quantity);
        } else {
          quantity =
            parseInt(user.cart[cartItemIndex].quantity) + parseInt(quantity);
          user.cart[cartItemIndex].quantity = quantity;
        }
      } else {
        user.cart.push({ pUid, quantity, uid });
      }

      user.markModified("cart");
      await user.save();

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
            quantity: item.quantity,
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
      user.markModified("role");
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
  const { uid } = req.body;
  try {
    let user = await User.findOne({ uid: uid });

    if (user) {
      user.cart = [];
      user.markModified("cart");
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

module.exports.updateProfile = async (req, res) => {
  const files = req.files;

  if (req.body.password === "" || req.body?.newPassword === "") {
    console.log("yes")
    delete req.body["password"];
    delete req.body["newPassword"];
  }

  try {
    let phoneFound = await User.findOne({ phone: req.body.phone, uid: { $ne: req.body.uid } });
    let emailFound = await User.findOne({ email: req.body.email, uid: { $ne: req.body.uid } });

    if (phoneFound || emailFound) {

      const newData = {
        user: {},
        message: "Existed!"
      }

      console.log("phone/email")

      return res.status(201).send(newData);

    } else {
      let user = await User.findOne({ uid: req.body.uid });
      console.log("yes yes", req.body.uid)
      if (user) {

        let imgUrl = [
          files?.image1 ? files?.image1[0]?.filename : user.imgUrl[0],
          files?.image2 ? files?.image2[0]?.filename : user.imgUrl[1],
        ];

        let message = "updated";
        let checked = true;
        if (user.password !== "NA" && user.password === req.body?.password) {
          req.body.password = req.body?.newPassword;
          delete req.body["newPassword"];
          checked = false
        }

        if (user.password !== req.body?.password && req.body?.password && checked) {
          console.log(user.password, "and", req.body?.password)
          message = "Password not matched!"
        }

        const updatedData = { ...req.body, imgUrl: imgUrl };
        const mergedData = { ...user.toObject(), ...updatedData };
        Object.assign(user, mergedData);
        const savedData = await user.save();

        const newData = {
          user: savedData,
          message: message
        }

        return res.status(201).send(newData);
      } else {
        res.statusMessage = "Error";
        return res.status(409).end();
      }
    }

  } catch (err) {
    console.error(err, "*******");
    res.statusMessage = "An error occurred while creating the user.";
    return res.status(500).end();
  }
};
