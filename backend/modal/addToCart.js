import mongoose from "../connection/dbConfig.js";
var addToCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required:false
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productModel',
        required:false
    }
});

export default mongoose.model('addToCartModel', addToCartSchema, 'addToCart');