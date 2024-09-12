import express from "express";
import asyncHandler from 'express-async-handler';
import { LoginCheck } from "../middlewares/logincheck.js";
import { style } from "../domains/recommend/recommend.controller.js";

export const recommendRouter = express.Router({mergeParams: true});

//스타일 추천
recommendRouter.get('/style', LoginCheck, asyncHandler(style));