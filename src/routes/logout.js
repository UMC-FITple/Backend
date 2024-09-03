import express from 'express';
import { LogoutLogic } from '../domains/logout/logout.controller.js';

export const logoutRouter = express.Router();

logoutRouter.post('/',LogoutLogic);