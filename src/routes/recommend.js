import express from "express";
import asyncHandler from 'express-async-handler';
import { LoginCheck } from "../middlewares/logincheck.js";
import { bodyInfo, bodyInfoAll, style, styleAll } from "../domains/recommend/recommend.controller.js";

export const recommendRouter = express.Router({mergeParams: true});

//체형 추천
recommendRouter.get('/body_info', LoginCheck, asyncHandler(bodyInfo));

//체형 추천-모두 보기
recommendRouter.get('/body_info/all', LoginCheck, asyncHandler(bodyInfoAll));

//스타일 추천
recommendRouter.get('/style', LoginCheck, asyncHandler(style));

//스타일 추천-모두 보기
recommendRouter.get('/style/all', LoginCheck, asyncHandler(styleAll));