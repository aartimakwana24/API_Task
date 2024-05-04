import mongoose from "../connection/dbConfig.js";
var productSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: false
    },
    productName: {
        type: String,
        required: false
    },
    productDetails: {
        type: String,
        require: false,
    },
    productPrice: {
        type: Number,
        require: false,
    },
    Quantity: {
        type: Number,
        require: false,
    },
    ratings: {
        type: Number,
        required: false
    },
    addToCart: {
        type: Boolean,
        required: false
    },
});

export default mongoose.model('productModel', productSchema, 'products');