import express from "express";
import asyncHandler from 'express-async-handler';
import { LoginCheck } from "../middlewares/logincheck.js";
import upload from "../config/s3.config.js";
import { info, myFit, wish } from "../domains/profile/profile.controller.js";

export const profileRouter = express.Router({mergeParams: true});

//상단 유저 정보
profileRouter.get('/', LoginCheck, asyncHandler(info));

//마이핏
profileRouter.get('/likes', LoginCheck, asyncHandler(myFit));

//관심핏
profileRouter.get('/wish', LoginCheck, asyncHandler(wish));
/*
//체형정보
profileRouter.get('/body_info', LoginCheck, asyncHandler(bodyInfo));

//더보기-설정
profileRouter.get('/setup', LoginCheck, asyncHandler(setUp));*/