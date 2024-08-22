import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getBodyinfo, getBodyinfoByID, getUserStyle, getUserStyleByID } from "./recommend.dao.js";
import { bodyinfo_toFlask_DTO, bodyinfoResponseDTO, member_style_toFlaskDTO, member_styleResponseDTO } from "./recommend.dto.js";
import axios from 'axios';

import { get_member, get_user_bodyinfo, get_user_bodyinfo_all, get_userfit, get_userstyle } from "./recommend.provider.js";

export const train_bodyinfo = async (req, res, next) => {
    // 모든 체형 정보 불러오기
    const bodyinfo = bodyinfoResponseDTO(await getBodyinfo()).bodyinfo;

    console.log(`쳬형정보: `, bodyinfo);

    const response_frm_flask = await axios.post('http://127.0.0.1:5000/train/bodyinfo', bodyinfo);

    console.log("통신 성공!")

    if (response_frm_flask.status == 200) {
        console.log(`훈련 결과: ${response_frm_flask.status} \n`, response_frm_flask.data);
        res.send(response(status.SUCCESS));
    } else {
        console.log(`체형정보 훈련 중 에러: `, response_frm_flask.error);
        res.send(response(status.TRAIN_ERROR));
    }
}

export const train_style = async (req, res, next) => {
    // 모든 체형 정보 불러오기
    const memberstyle = member_styleResponseDTO(await getUserStyle()).memeberstyle;

    console.log(`스타일정보: `, memberstyle);

    const response_frm_flask = await axios.post('http://127.0.0.1:5000/train/style', memberstyle);

    console.log("통신 성공!")

    if (response_frm_flask.status == 200) {
        console.log(`훈련 결과: ${response_frm_flask.status} \n`, response_frm_flask.data);
        res.send(response(status.SUCCESS));
    } else {
        console.log(`스타일정보 훈련 중 에러: `, response_frm_flask.error);
        res.send(response(status.TRAIN_ERROR));
    }
}

export const recommend_bodyinfo_by_uuid = async (req, res, next) => {
    // 추천 요청한 uuid
    const uuid = res.locals.uuid;

    console.log("비슷한 체형 사용자 추천 요청. 사용자: ", uuid);

    // uuid로 체형 정보 불러오기
    const bodyinfo = bodyinfo_toFlask_DTO(await getBodyinfoByID(uuid)).bodyinfo;

    console.log(`사용자 ${uuid}의 쳬형정보: `, bodyinfo);

    const response_frm_flask = await axios.post('http://127.0.0.1:5000/recommend/bodyinfo/', bodyinfo);

    console.log("통신 성공!")
    console.log("받은 정보: ", response_frm_flask.data.result);

    // 응답받은 uuid 데이터 배열로 형태 변환
    const uuid_arr = response_frm_flask.data.result;

    res.send(response(status.SUCCESS, await get_member(uuid_arr)));
    
}

export const recommend_style_by_uuid = async (req, res, next) => {
    // 추천 요청한 uuid
    const uuid = res.locals.uuid;

    console.log("비슷한 스타일 사용자 추천 요청. 사용자: ", uuid);

    // uuid로 체형 정보 불러오기
    const style = member_style_toFlaskDTO(await getUserStyleByID(uuid)).memeberstyle;

    console.log(`사용자 ${uuid}의 쳬형정보: `, style);

    const response_frm_flask = await axios.post('http://127.0.0.1:5000/recommend/style/', style);

    console.log("통신 성공!")
    console.log("받은 정보: ", response_frm_flask);

    // 응답받은 uuid 데이터 배열로 형태 변환
    const uuid_arr = response_frm_flask.data.result;

    res.send(response(status.SUCCESS, await get_member(uuid_arr)));
    
}

export const get_bodyinfo_by_uuid = async (req, res, next) => {
    console.log("사용자 체형정보 요청.");
    console.log("path:", res.locals.uuid);

    res.send(response(status.SUCCESS, await get_user_bodyinfo(res.locals.uuid)));
    
}

export const get_bodyinfo_all = async (req, res, next) => {
    console.log("사용자 체형정보 요청.");

    res.send(response(status.SUCCESS, await get_user_bodyinfo_all()));
}

export const get_member_by_uuid = async (req, res, next) => {
    console.log("사용자 정보 요청. 사용자: ", res.locals.uuid);
    res.send(response(status.SUCCESS, await get_member(res.locals.uuid)));
    
}

export const get_userfit_by_uuid = async (req, res, next) => {
    console.log("사용자 선호 핏 정보 요청. 사용자:", res.locals.uuid);
    res.send(response(status.SUCCESS, await get_userfit(res.locals.uuid)));
    
}

export const get_userstyle_by_uuid = async (req, res, next) => {
    console.log("사용자 선호 스타일 정보 요청. 사용자:", res.locals.uuid);

    res.send(response(status.SUCCESS, await get_userstyle(res.locals.uuid)));

}
