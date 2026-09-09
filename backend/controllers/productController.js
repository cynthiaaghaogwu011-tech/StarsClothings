const Product = require('../models/product.js');

const getProducts = async (req, res) => {
    try { 
        const products = await Product.find();
        res.json({
            message: "Products retrieved successfully!",
            data: products
        });
    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error);
        res.status(500).json({
            message: "Failed to retrieve products.",
            error: error.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            message: "Product created successfully!",
            data: product
        });
    } catch (error) {
        console.error("CREATE PRODUCT ERROR:", error);
        res.status(500).json({
            message: "Failed to create product.",
            error: error.message
        });
    }
};

module.exports = {
    getProducts,
    createProduct
};
