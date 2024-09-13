import { getStyleDTO } from "./recommend.dto.js"
import { getStyleDAO, getStyleAllDAO } from "./recommend.dao.js";

export const getStyle = async (userId) => {
    return getStyleDTO(await getStyleDAO(userId));
}

export const getStyleAll = async (userId) => {
    return getStyleDTO(await getStyleAllDAO(userId));
}