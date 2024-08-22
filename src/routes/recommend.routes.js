// routes/recommend.route.js
import express from "express";
import asyncHandler from 'express-async-handler';
import { recommend_bodyinfo_by_uuid, recommend_style_by_uuid, train_bodyinfo, train_style } from "../domains/recommend/recommend.controller.js"
import { LoginCheck } from "../middlewares/logincheck.js";


export const recommendRouter = express.Router({mergeParams: true});

// // 추천: 비슷한 체형 사용자
recommendRouter.get('/bodyinfo/', LoginCheck, asyncHandler(recommend_bodyinfo_by_uuid));

// // 추천: 비슷한 스타일 선호 사용자
recommendRouter.get('/style/', LoginCheck, asyncHandler(recommend_style_by_uuid));

// 추천: 체형 정보 데이터로 훈련
recommendRouter.post('/train/bodyinfo', asyncHandler(train_bodyinfo));

// 추천: 체형 정보 데이터로 훈련
recommendRouter.post('/train/style', asyncHandler(train_style));
