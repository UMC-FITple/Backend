import express from 'express';
import { refreshTokenLogic } from '../domains/refreshToken/refreshToken.controller.js';

export const refreshTokenRouter = express.Router();

refreshTokenRouter.get('/',refreshTokenLogic);