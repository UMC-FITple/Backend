import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { bodyinfoResponseDTO, member_fitResponseDTO, member_styleResponseDTO, memberResponseDTO } from "./recommend.dto.js"
import { getMemberByID, getBodyinfoByID, getUserFitByID, getUserStyleByID } from "./recommend.dao.js";


export const get_user_bodyinfo = async (uuid) => {
    return bodyinfoResponseDTO(await getBodyinfoByID(uuid));
}

export const get_member = async (uuid_arr) => {
    return memberResponseDTO(await getMemberByID(uuid_arr), await getBodyinfoByID(uuid_arr), await getUserFitByID(uuid_arr), await getUserStyleByID(uuid_arr));
}

export const get_userfit = async (uuid) => {
    return member_fitResponseDTO(await getUserFitByID(uuid));
}

export const get_userstyle = async (uuid) => {
    return member_styleResponseDTO(await getUserStyleByID(uuid));
}