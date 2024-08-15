import express from 'express';
import { AuthResetPassword, FindUserId, SetResetPassword } from '../domains/auth/auth.controller.js';

export const AuthRouter = express.Router();

AuthRouter.post('/find-id',FindUserId);
AuthRouter.post('/reset-password',AuthResetPassword);
AuthRouter.patch('/reset-password',SetResetPassword);