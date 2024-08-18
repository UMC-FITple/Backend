import express from "express";
import asyncHandler from 'express-async-handler';
import { LoginCheck } from "../middlewares/logincheck.js";
import { myClosetPreview, myClothView, addCloth } from "../domains/closet/closet.controller.js";

export const closetRouter = express.Router({mergeParams: true});

//옷장-메인화면
closetRouter.get('/main', LoginCheck, asyncHandler(myClosetPreview));

//옷장-아이템 상세정보
closetRouter.get('/:clothId', LoginCheck, asyncHandler(myClothView));

//옷장-직접 등록하기
closetRouter.post('/', LoginCheck, asyncHandler(addCloth));