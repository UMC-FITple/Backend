import { getInfoDTO, getMyFitDTO, getWishDTO, getBodyInfoDTO } from "./profile.dto.js"
import { getUserDAO, getFitDAO, getStyleDAO, getFollowDAO, getMyFitDAO, getWishDAO, getBodyInfoDAO } from "./profile.dao.js";

export const getInfo = async (userId) => {
    return getInfoDTO(await getUserDAO(userId), await getFitDAO(userId), await getStyleDAO(userId), await getFollowDAO(userId));
}

export const getMyFit = async (userId, query) => {
    const { category } = query;
    return getMyFitDTO(await getMyFitDAO(userId, category));
}

export const getWish = async (userId, query) => {
    const { category } = query;
    return getWishDTO(await getWishDAO(userId, category));
}

export const getBodyInfo = async (userId) => {
    return getBodyInfoDTO(await getBodyInfoDAO(userId));
}