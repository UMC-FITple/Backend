import { getInfoDTO, getMyFitDTO, getWishDTO } from "./profile.dto.js"
import { getUserDAO, getFitDAO, getStyleDAO, getFollowDAO, getMyFitDAO, getWishDAO } from "./profile.dao.js";

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