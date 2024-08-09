import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { recommend_user_bodyinfo } from "./recommend.provider.js";

export const recommend_bodyinfo = async (req, res, next) => {
    console.log("비슷한 체형 사용자 추천 요청.");
    
    const userId = req.query.id; // 쿼리 파라미터로 ID를 받음
    console.log("userId:", userId);

    try {
        const responseBody = await recommend_user_bodyinfo(userId);
        res.send(response(status.SUCCESS, responseBody));
    } catch (error) {
        next(error); // 에러 핸들링
    }
}

export const get_bodyinfo = async (req, res, next) => {
    console.log("모든 체형정보 요청.");
    
    const userId = req.query.id; // 쿼리 파라미터로 ID를 받음
    console.log("userId:", userId);

    try {
        const responseBody = await recommend_user_bodyinfo(userId);
        res.send(response(status.SUCCESS, responseBody));
    } catch (error) {
        next(error); // 에러 핸들링
    }
}

// export const recommend_style = async (req, res, next) => {
//     console.log("비슷한 스타일 사용자 추천 요청.");
//     console.log("body:", req.body); // 값이 잘 들어오나 찍어보기 위한 테스트용

//     res.send(response(status.SUCCESS, await recommend_user_bodyinfo(req.body)));
// }