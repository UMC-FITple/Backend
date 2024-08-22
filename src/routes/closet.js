import express from "express";
import asyncHandler from 'express-async-handler';
import { LoginCheck } from "../middlewares/logincheck.js";
import upload from "../config/s3.config.js";
import { myClosetPreview, brandPreview, myClothView, addCloth, addImage } from "../domains/closet/closet.controller.js";

export const closetRouter = express.Router({mergeParams: true});

//옷장-메인화면
closetRouter.get('/main', LoginCheck, asyncHandler(myClosetPreview));

//옷장-브랜드 검색
closetRouter.get('/brand', asyncHandler(brandPreview));

//옷장-아이템 상세정보
closetRouter.get('/:clothId', LoginCheck, asyncHandler(myClothView));

//옷장-직접 등록하기
closetRouter.post('/', LoginCheck, asyncHandler(addCloth));

//옷장-이미지 업로드
closetRouter.post('/image', LoginCheck, upload.single('image'), asyncHandler(addImage));