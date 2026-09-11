const Product = require('../models/product.js');

const getProducts = async (req, res) => {
    try { 
        const filter = {};
        if (req.query.category) {
            filter.category = req.query.category;
        }
        const products = await Product.find(filter);
        res.status(200).json({
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
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: "Validation failed", error: error.message });
        }
        res.status(500).json({
            message: "Failed to create product.",
            error: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found."
            })
        }
        res.json({
            message: "Product retrieved successfully!",
            data: product
        });
    } catch (error) {
        console.error("GET PRODUCT BY ID ERROR:", error);
        res.status(500).json({
            message: "Failed to retrieve product.",
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!product) {
            return res.status(404).json({
                message: "Product not found."
            })
        }
        res.json({
            message: "Product updated successfully!",
            data: product
        });
    } catch (error) {
        console.error("UPDATE PRODUCT ERROR:", error);
        res.status(500).json({
            message: "Failed to update product.",
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found."
            })
        }
        res.json({
            message: "Product deleted successfully!."
        })
    } catch (error) {
        console.error("DELETE PRODUCT ERROR: ", error);
        res.status(500).json({
            message: "Failed to delete product.",
            error: error.message
        });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
