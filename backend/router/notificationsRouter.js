import express from 'express';
import { createNotification , getNotification } from '../controller/notificationsController.js';
var notificationsRouter = express.Router();
notificationsRouter.post('/createNotifications',createNotification);
notificationsRouter.post('/getNotifications',getNotification);
export default notificationsRouter;