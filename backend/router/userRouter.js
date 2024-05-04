import express from 'express';
import { userRegistrationController ,userOTPLoginController,forgetPassOtpController,resetPasswordController ,userLogOutController } from '../controller/userController.js';
var userRouter = express.Router();
userRouter.post("/userRegistration", userRegistrationController);
userRouter.post("/loginWithOTP", userOTPLoginController);
userRouter.post("/forgetPassOtp", forgetPassOtpController); 
userRouter.post("/resetPassword", resetPasswordController); 
userRouter.post("/userLogOut", userLogOutController); 

export default userRouter;