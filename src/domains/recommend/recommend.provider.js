import { getBodyInfoDTO, getStyleDTO } from "./recommend.dto.js"
import { getBodyInfoDAO, getBodyInfoAllDAO, getStyleDAO, getStyleAllDAO } from "./recommend.dao.js";

export const getBodyInfo = async (userId) => {
    return getBodyInfoDTO(await getBodyInfoDAO(userId));
}

export const getBodyInfoAll = async (userId) => {
    return getBodyInfoDTO(await getBodyInfoAllDAO(userId));
}

export const getStyle = async (userId) => {
    return getStyleDTO(await getStyleDAO(userId));
}

export const getStyleAll = async (userId) => {
    return getStyleDTO(await getStyleAllDAO(userId));
}