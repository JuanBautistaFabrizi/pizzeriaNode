const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
//const {generateJWT} =
const User = require("../Models/User");

const UserRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = new User({ name, email, password, role });

  const salt = genSaltSync(8);
  try {
    newUser.password = hashSync(password, salt);
    await newUser.save();
  
    res.json({
      newUser,
    });
    
  } catch (error) {
    console.log(error);
  }
};

