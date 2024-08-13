import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getBodyinfoByID, getUserStyleByID } from "./recommend.dao.js";
import { bodyinfo_toFlask_DTO, member_style_toFlaskDTO } from "./recommend.dto.js";
import axios from 'axios';

import { get_member, get_user_bodyinfo, get_userfit, get_userstyle } from "./recommend.provider.js";

// 추천시스템 대신하기 위한 랜덤 함수
function getRandomNumbers(count, min, max) {
    const randomNumbers = new Set(); // 중복 방지를 위해 Set 사용

    while (randomNumbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.add(randomNumber); // Set에 추가 (중복 시 무시됨)
    }

    return Array.from(randomNumbers); // Set을 배열로 변환
}

export const recommend_bodyinfo_by_uuid = async (req, res, next) => {
    // 추천 요청한 uuid
    const uuid = req.params.uuid;

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
    const uuid = req.params.uuid;

    console.log("비슷한 스타일 사용자 추천 요청. 사용자: ", uuid);

    // uuid로 체형 정보 불러오기
    const style = member_style_toFlaskDTO(await getUserStyleByID(uuid)).memeberstyle;

    console.log(`사용자 ${uuid}의 쳬형정보: `, style);

    const response_frm_flask = await axios.post('http://127.0.0.1:5000/recommend/style/', style);

    console.log("통신 성공!")
    console.log("받은 정보: ", response_frm_flask.data);

    // 응답받은 uuid 데이터 배열로 형태 변환
    const uuid_arr = response_frm_flask.data.result;

    res.send(response(status.SUCCESS, await get_member(uuid_arr)));
    
}

export const get_bodyinfo_by_uuid = async (req, res, next) => {
    console.log("사용자 체형정보 요청.");
    console.log("path:", req.params.uuid);

    res.send(response(status.SUCCESS, await get_user_bodyinfo(req.params.uuid)));
    
}

export const get_member_by_uuid = async (req, res, next) => {
    console.log("사용자 정보 요청. 사용자: ", req.params.uuid);
    res.send(response(status.SUCCESS, await get_member(req.params.uuid)));
    
}

export const get_userfit_by_uuid = async (req, res, next) => {
    console.log("사용자 선호 핏 정보 요청. 사용자:", req.params.uuid);
    res.send(response(status.SUCCESS, await get_userfit(req.params.uuid)));
    
}

export const get_userstyle_by_uuid = async (req, res, next) => {
    console.log("사용자 선호 스타일 정보 요청. 사용자:", req.params.uuid);
    res.send(response(status.SUCCESS, await get_userstyle(req.params.uuid)));
    
}
