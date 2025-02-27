import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getInfo, getMyFit, getWish, getBodyInfo, getSetUp } from "./profile.provider.js";
import {  } from "./profile.service.js";

export const info = async (req, res, next) => {
    console.log("내 정보를 조회합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getInfo(userId)));
}

export const myFit = async (req, res, next) => {
    console.log("내가 좋아하는 옷을 조회합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getMyFit(userId, req.query)));
}

export const wish = async (req, res, next) => {
    console.log("내가 관심있는 옷을 조회합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getWish(userId, req.query)));
}

export const bodyInfo = async (req, res, next) => {
    console.log("내 체형정보를 조회합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getBodyInfo(userId)));
}

export const setUp = async (req, res, next) => {
    console.log("내 기본정보를 조회합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getSetUp(userId)));
}