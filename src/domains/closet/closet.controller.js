import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getMyCloset, getMyCloth } from "./closet.provider.js";

export const myClosetPreview = async (req, res, next) => {
    console.log("내 옷장을 조회합니다");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getMyCloset(userId, req.query)));
}


export const myClothView = async (req, res, next) => {
    try {
        console.log("내 옷을 상세 조회합니다");
        const userId = res.locals.uuid;
        const success = await getMyCloth(userId, req.params.clothId);

        // getMyCloth가 false -> catch
        if (success) {
            res.send(response(status.SUCCESS));
        }
    } catch (error) {
        console.error("옷 상세 조회 중 에러 발생:", error);

        if (error.data.code === status.PARAMETER_IS_WRONG.code) {
            res.status(400).send(response(status.PARAMETER_IS_WRONG));
        } else if (error.data.code === status.UNAUTHORIZED.code) {
            res.status(401).send(response(status.UNAUTHORIZED));
        } else {
            res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
        }
        
        next(error);
    }
}