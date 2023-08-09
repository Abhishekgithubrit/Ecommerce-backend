const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// exports.loginUser = async (req, res) => {
//     const user = req.user;
//     res
//       .cookie('jwt', user.token, {
//         expires: new Date(Date.now() + 3600000),
//         httpOnly: true,
//       })
//       .status(201)
//       .json({ id: user.id, role: user.role });
//   };

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email },
    ).exec();
    console.log({ user });
    if (!user) {
      res.status(401).json({ message: "no such user email" });
    } else if (user.password == req.body.password) {
      res.status(201).json({id:user.id, email:user.email, name:user.name, addresses:user.addresses});
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch {
    res.status(400).json(err);
  }
};
