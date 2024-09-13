import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getStyle, getStyleAll } from "./recommend.provider.js";

export const style = async (req, res, next) => {
    console.log("비슷한 스타일의 유저를 추천합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getStyle(userId)));
}

export const styleAll = async (req, res, next) => {
    console.log("비슷한 스타일의 유저를 모두 추천합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getStyleAll(userId)));
}