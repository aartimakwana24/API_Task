import express from 'express';
import { productDetailsController } from '../controller/productController.js';
var productRouter = express.Router();
productRouter.post('/productDetails',productDetailsController);
export default productRouter;