import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getBodyInfo, getBodyInfoAll } from "./recommend.provider.js";

export const bodyInfo = async (req, res, next) => {
    console.log("비슷한 체형의 유저를 추천합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getBodyInfo(userId)));
}

export const bodyInfoAll = async (req, res, next) => {
    console.log("비슷한 체형의 유저를 추천합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getBodyInfoAll(userId)));
}