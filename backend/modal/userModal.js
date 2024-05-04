import mongoose from "../connection/dbConfig.js";
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        require: false,
        unique: true

    },
    password: {
        type: String,
        required: false
    },
    confirmPassword: {
        type: String,
        required: false
    },
    contact: {
        type: Number,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    location: {
        type: String,
        require: false
    },
});

export default mongoose.model('userModel', userSchema, 'user');