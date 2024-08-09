// routes/recommend.route.js
import express from "express";
import asyncHandler from 'express-async-handler';

import { recommend_bodyinfo } from "../domains/recommend/recommend.controller.js"


export const bodyinfoRouter = express.Router();
bodyinfoRouter.get('/bodyinfo', asyncHandler(recommend_bodyinfo)); // '/recommend'으로 GET 요청

