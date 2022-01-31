const Router = require("express");
const { check } = require("express-validator");
const {
  allCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categories");
const { categoryId } = require("../helpers/db-validators");
const { verifyFields } = require("../Middlewares/verify-fields");
const { isAdmin } = require("../Middlewares/verify-role");
const verifyJTW = require("../Middlewares/verify-jwt");
const router = Router();

router.get("/", allCategories);

router.get(
  "/:id",
  [
    verifyJWT,
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(categoryId),
    verifyFields,
  ],
  getCategory
);

router.post(
  "/",
  [
    verifyJTW,
    check("name", "El nombre es obligatorio").notEmpty(),
    verifyFields,
  ],
  createCategory
);

router.put('/:id',[
    verifyJTW,
    isAdmin,
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(categoryId),
    check('name','el nombre es obligatorio').notEmpty(),
    verifyFields
],updateCategory)

router.delete('/id',[
    verifyJTW,
    isAdmin,
    check("id", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(categoryId),
    verifyFields
],deleteCategory)

module.exports = {
    router
}