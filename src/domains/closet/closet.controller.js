import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getMyCloset, getMyCloth, getBrand } from "./closet.provider.js";

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

export const brandPreview = async (req, res, next) => {
    console.log("브랜드를 검색합니다");
    res.send(response(status.SUCCESS, await getBrand(req.query)));
}