import express from "express";
import asyncHandler from 'express-async-handler';
import { LoginCheck } from "../middlewares/logincheck.js";
import { bodyInfo } from "../domains/recommend/recommend.controller.js";

export const recommendRouter = express.Router({mergeParams: true});

//체형 추천
recommendRouter.get('/body_info', LoginCheck, asyncHandler(bodyInfo));