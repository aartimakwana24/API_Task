import mongoose from "../connection/dbConfig.js";
const notificationSchema = new mongoose.Schema({
    title: {
        type:String,
        required: false
    },
    body:  {
        type:String,
        required: false
    },
    recipient:  {
        type:String,
        required: false
    },
    type:  {
        type:String,
        required: false
    },
});

export default mongoose.model('notificationModal', notificationSchema, 'notifications');
