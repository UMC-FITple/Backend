import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getMyCloset, getMyCloth } from "./closet.provider.js";
import { addMyCloth } from "./closet.service.js";

export const myClosetPreview = async (req, res, next) => {
    console.log("내 옷장을 조회합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getMyCloset(userId, req.query)));
}


export const myClothView = async (req, res, next) => {
    try {
        console.log("내 옷을 상세 조회합니다");
        const userId = res.locals.uuid;
        res.send(response(status.SUCCESS, await getMyCloth(userId, req.params.clothId)));
    } catch (error) {
        console.error("옷 상세 조회 중 에러 발생:", error);

        if (error.data.code === status.PARAMETER_IS_WRONG.code) {
            res.status(400).send(response(status.PARAMETER_IS_WRONG));
        } else if (error.data.code === status.FORBIDDEN.code) {
            res.status(403).send(response(status.FORBIDDEN));
        } else if (error.data.code === status.NOT_FOUND.code) {
            res.status(404).send(response(status.NOT_FOUND));
        } else {
            res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
        }
        
        next(error);
    }
}

export const addCloth = async (req, res, next) => {
    console.log("옷 등록을 요청하였습니다!");
    const userId = res.locals.uuid;
    
    console.log("userId:", userId);
    console.log("body:", req.body);

    res.send(response(status.SUCCESS, await addMyCloth(userId, req.body)));
}