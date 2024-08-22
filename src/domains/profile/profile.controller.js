import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getInfo, getMyFit } from "./profile.provider.js";
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