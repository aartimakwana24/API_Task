import express from 'express';
import cors from 'cors';
import methodOverride from 'method-override';
import expressFileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from 'url';
import session from 'express-session';
import crypto from 'crypto';

import userRouter from './router/userRouter.js';
import productRouter from './router/productRouter.js';
import notificationsRouter from './router/notificationsRouter.js';
import addToCartRouter from './router/addToCartRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const PORT = process.env.PORT || 3001;
const randomBytes = crypto.randomBytes(32);
const secretKey = randomBytes.toString('hex');

app.use(session({secret: secretKey,resave: false,saveUninitialized: false}));
app.use(express.static(path.join(__dirname, 'public/assets/images')));
app.use("/public/assets/images", express.static("images"));

app.use(cors());
app.use(methodOverride("_method"));
app.use(expressFileUpload());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/user', userRouter);
app.use('/product',productRouter);
app.use('/notification',notificationsRouter);
app.use('/addToCart',addToCartRouter);


app.listen(PORT,()=>{
console.log("Server Started");
});