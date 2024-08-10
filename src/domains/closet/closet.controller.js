import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getMyCloset, getMyCloth } from "./closet.provider.js";

export const myClosetPreview = async (req, res, next) => {
    console.log("내 옷장을 조회합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getMyCloset(userId, req.query)));
}

export const myClothView = async (req, res, next) => {
    console.log("내 옷을 상세 조회합니다");
    res.send(response(status.SUCCESS, await getMyCloth(req.params.clothId)));
}