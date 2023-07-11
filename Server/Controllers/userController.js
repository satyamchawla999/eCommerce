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
