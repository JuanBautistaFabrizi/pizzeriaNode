const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { productId, categoryId } = require('../helpers/db-validators');

const { verifyJWT } = require('../middlewares/verify-jwt');
const { verifyFields } = require('../middlewares/verify-fields');
const { isAdmin } = require('../middlewares/verify-role');

const { 
    allProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/products');

router.get('/', allProducts);

router.get('/:id', [
    verifyJWT,
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(productId),
    verifyFields
], getProduct);

router.post('/', [
    verifyJWT,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('category', 'No es un ID valido de Mongo').isMongoId(),
    check('category').custom(categoryId),
    verifyFields
], createProduct);

router.put('/:id', [
    verifyJWT,
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(productId),
    verifyFields
], updateProduct);

router.delete('/:id', [
    verifyJWT,
    isAdmin,
    check('id', 'No es un ID valido de Mongo').isMongoId(),
    check('id').custom(productId),
    verifyFields
], deleteProduct);

module.exports = router;