const { Router } = require("express");
const { check } = require("express-validator");
const { email, role } = require('../helpers/db-validators');
const { verifyFields } = require('../Middlewares/verify-fields');
const { userLogin, userRegister } = require("../Controllers/auth");
const router = Router();

router.post(
  "/register",
  [
    check("name", "el nombre es obligatorio").notEmpty(),
    check("email", "el email es obligatorio").custom(email).isEmail(),
    check("password", "el password es obligatorio/min 8 caracteres")
      .notEmpty()
      .isLength({ min: 8 }),
    check("role", "el role es obligatorio").custom(role).notEmpty(),
    verifyFields
  ],
  userRegister
);

router.post('/login',[
    check('email','el email es obligatorio').isEmail(),
    check('password','el password es obligatorio').notEmpty(),
    verifyFields
],userLogin);

module.exports = {
    router
}
