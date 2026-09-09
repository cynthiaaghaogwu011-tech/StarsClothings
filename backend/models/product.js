const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    sizes: {
        type: [String],
        required: true
    },
    colors: {
        type: [String],
    },
    stock: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;