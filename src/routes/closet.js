import express from "express";
import asyncHandler from 'express-async-handler';
import { myClosetPreview, myClothView } from "../domains/closet/closet.controller.js";

export const closetRouter = express.Router({mergeParams: true});

//옷장-메인화면
closetRouter.get('/main', asyncHandler(myClosetPreview));

//옷장-아이템 상세정보
closetRouter.get('/:clothId', asyncHandler(myClothView));

//closetRouter.post('/closet/add', asyncHandler(clothAdd));