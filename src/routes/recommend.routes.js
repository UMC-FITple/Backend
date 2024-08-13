// routes/recommend.route.js
import express from "express";
import asyncHandler from 'express-async-handler';
import { get_bodyinfo_by_uuid, get_member_by_uuid, get_userfit_by_uuid, get_userstyle_by_uuid, recommend_bodyinfo_by_uuid, recommend_style_by_uuid } from "../domains/recommend/recommend.controller.js"


export const recommendRouter = express.Router({mergeParams: true});

// 추천: id로 정보 얻기
recommendRouter.get('/getbodyinfo/:uuid', asyncHandler(get_bodyinfo_by_uuid));

// 추천: id로 정보 얻기
recommendRouter.get('/getmember/:uuid', asyncHandler(get_member_by_uuid));

// 추천: id로 정보 얻기
recommendRouter.get('/getuserstyle/:uuid', asyncHandler(get_userstyle_by_uuid));

// 추천: id로 정보 얻기
recommendRouter.get('/getuserfit/:uuid', asyncHandler(get_userfit_by_uuid));

// // 추천: 비슷한 체형 사용자
recommendRouter.get('/bodyinfo/:uuid', asyncHandler(recommend_bodyinfo_by_uuid));

// // 추천: 비슷한 스타일 선호 사용자
recommendRouter.get('/style/:uuid', asyncHandler(recommend_style_by_uuid));

