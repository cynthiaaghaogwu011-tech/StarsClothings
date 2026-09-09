const express = require('express');
const router = express.Router();  //Create the router instance.
const {getProducts, createProduct} = require('../controllers/productController.js');

router.get('/', getProducts);
router.post('/', createProduct);

module.exports = router;