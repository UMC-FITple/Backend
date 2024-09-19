import { getBodyInfoDTO } from "./recommend.dto.js"
import { getBodyInfoDAO, getBodyInfoAllDAO } from "./recommend.dao.js";

export const getBodyInfo = async (userId) => {
    return getBodyInfoDTO(await getBodyInfoDAO(userId));
}

export const getBodyInfoAll = async (userId) => {
    return getBodyInfoDTO(await getBodyInfoAllDAO(userId));
}