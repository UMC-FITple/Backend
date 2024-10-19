import express from "express";
import asyncHandler from 'express-async-handler';
import { LoginCheck } from "../middlewares/logincheck.js";
import { searchPreview, clothView, searchView, brandView, addClothPreview, addCloth,
    addWish, delWish, getWish, addFollow, delFollow, getFollow } from "../domains/search/search.controller.js";

export const searchRouter = express.Router({mergeParams: true});

//검색-메인화면
searchRouter.get('/main', LoginCheck, asyncHandler(searchPreview));

//검색-아이템 상세정보
searchRouter.get('/:clothId', LoginCheck, asyncHandler(clothView));

//검색-통합 검색
searchRouter.get('', LoginCheck, asyncHandler(searchView));

//검색-브랜드
searchRouter.get('/brand/:brandId', LoginCheck, asyncHandler(brandView));

//검색-옷장에 추가
searchRouter.get('/:clothId/add', LoginCheck, asyncHandler(addClothPreview));

//검색-옷장에 등록
searchRouter.post('/:clothId/add', LoginCheck, asyncHandler(addCloth));

//검색-wish에 추가
searchRouter.post('/:clothId/wish', LoginCheck, asyncHandler(addWish));

//검색-wish에서 삭제
searchRouter.delete('/:clothId/wish', LoginCheck, asyncHandler(delWish));

//검색-wish 조회
searchRouter.get('/:clothId/wish', LoginCheck, asyncHandler(getWish));

//검색-follow에 추가
searchRouter.post('/:clothId/follow', LoginCheck, asyncHandler(addFollow));

//검색-follow에서 삭제
searchRouter.delete('/:clothId/follow', LoginCheck, asyncHandler(delFollow));

//검색-follow 조회
searchRouter.get('/:clothId/follow', LoginCheck, asyncHandler(getFollow));