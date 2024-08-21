// routes/recommend.route.js
import express from "express";
import asyncHandler from 'express-async-handler';
import { get_bodyinfo_all, get_bodyinfo_by_uuid, get_member_by_uuid, get_userfit_by_uuid, get_userstyle_by_uuid, recommend_bodyinfo_by_uuid, recommend_style_by_uuid, train_bodyinfo } from "../domains/recommend/recommend.controller.js"
import { LoginCheck } from "../middlewares/logincheck.js";


export const recommendRouter = express.Router({mergeParams: true});

// 추천: 모든 사용자 체형정보 얻기
recommendRouter.get('/getbodyinfo/all', asyncHandler(get_bodyinfo_all));

// 추천: id로 정보 얻기
recommendRouter.get('/getbodyinfo/', LoginCheck, asyncHandler(get_bodyinfo_by_uuid));

// 추천: id로 정보 얻기
recommendRouter.get('/getmember/', LoginCheck, asyncHandler(get_member_by_uuid));

// 추천: id로 정보 얻기
recommendRouter.get('/getuserstyle/', LoginCheck, asyncHandler(get_userstyle_by_uuid));

// 추천: id로 정보 얻기
recommendRouter.get('/getuserfit/', LoginCheck, asyncHandler(get_userfit_by_uuid));

// // 추천: 비슷한 체형 사용자
recommendRouter.get('/bodyinfo/', LoginCheck, asyncHandler(recommend_bodyinfo_by_uuid));

// // 추천: 비슷한 스타일 선호 사용자
recommendRouter.get('/style/', LoginCheck, asyncHandler(recommend_style_by_uuid));

// 추천: 체형 정보 데이터로 훈련
recommendRouter.post('/train/bodyinfo', asyncHandler(train_bodyinfo));

// 추천: 체형 정보 데이터로 훈련
recommendRouter.post('/train/style', asyncHandler(train_bodyinfo));
