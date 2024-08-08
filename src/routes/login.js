import express from 'express';
import { LoginLogic } from '../domains/login/login.controller.js';

export const loginRouter = express.Router();

loginRouter.post('/',LoginLogic);