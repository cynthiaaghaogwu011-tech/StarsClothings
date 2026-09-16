const express = require('express');
const router = express.Router();  //Create the router instance.
const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/productController.js');
const protectAdmin = require('../middleware/authMiddleware.js');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protectAdmin, createProduct);
router.put('/:id', protectAdmin, updateProduct);
router.delete('/:id', protectAdmin, deleteProduct);

module.exports = router;