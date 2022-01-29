const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { findOne } = require("../Models/User");
const { generateJWT } = require('../helpers/generate-jwt');
const User = require("../Models/User");

const userRegister = async (req, res) => {
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
    res.status(500).json('No se puede registrar el usuario');
  }
};

const userLogin = async (req,res) => {
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      res.status(401).json({msg: 'email incorrecto'});
    }
     
    const verifyPassword = compareSync(password,user.password);
    if(!verifyPassword){
      res.status(401).json({msg: 'password incorrecto'})
    }

    const token = await generateJTW(user.id);
    res.status(200).json(user,token);
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  userRegister,
  userLogin
}