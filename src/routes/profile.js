import express from "express";
import asyncHandler from 'express-async-handler';
import { LoginCheck } from "../middlewares/logincheck.js";
import upload from "../config/s3.config.js";
import { myFit, myFitCloth, wish, bodyInfo, setUp } from "../domains/profile/profile.controller.js";

export const profileRouter = express.Router({mergeParams: true});

//마이핏
profileRouter.get('/', LoginCheck, asyncHandler(myFit));

//마이핏-옷정보
profileRouter.get('/brand', LoginCheck, asyncHandler(myFitCloth));

//관심핏
profileRouter.post('/brand', LoginCheck, asyncHandler(wish));

//체형정보
profileRouter.get('/:clothId', LoginCheck, asyncHandler(bodyInfo));

//더보기-설정
profileRouter.post('/', LoginCheck, asyncHandler(setUp));