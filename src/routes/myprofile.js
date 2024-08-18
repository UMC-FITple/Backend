import express from 'express';
import { MyprofileSaveLogic } from '../domains/myprofile/myprofile.controller.js';
import upload from '../config/s3.config.js';

export const MyprofileRouter = express.Router();

MyprofileRouter.post('/',upload.single('image'),MyprofileSaveLogic);