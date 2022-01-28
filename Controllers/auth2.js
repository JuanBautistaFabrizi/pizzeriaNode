const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const User = require("../Models/User");

const UserRegister = async (req, res) => {
  const { name, status, role } = req.body;
  const newUser = new User({ name, status, role });

  try {
    const salt = genSaltSync(8);
    newUser.password = hashSync(password, salt);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};


