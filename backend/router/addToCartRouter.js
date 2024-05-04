import express from 'express';
import { addToCartController } from '../controller/addToCartController.js';
var  addToCartRouter = express.Router();
addToCartRouter.post('/userAddToCart',addToCartController);

export default addToCartRouter;
