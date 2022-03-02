const { Router } = require('express');
const { check } = require('express-validator');

const { verifyJWT } = require('../middlewares/verify-jwt');
const { verifyFields } = require('../middlewares/verify-fields');
const { isAdmin } = require('../middlewares/verify-role');
const { categoryId } = require('../helpers/db-validators');

const {
    createCategory,
    deleteCategory,
    allCategories,
    getCateogry,
    updateCategory 
} = require('../controllers/categories');

const router = Router();

router.get('/', allCategories);

router.get('/:id', [
    verifyJWT,
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(categoryId),
    verifyFields
], getCateogry);

router.post('/', [
    verifyJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    verifyFields
], createCategory);

router.put('/:id', [
    verifyJWT,
    isAdmin,
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(categoryId),
    check('name', 'El nombre es obligatorio').notEmpty(),
    verifyFields
], updateCategory);

router.delete('/:id', [
    verifyJWT,
    isAdmin,
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(categoryId),
    verifyFields
], deleteCategory);

module.exports = router;