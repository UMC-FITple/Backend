import { getInfoDTO } from "./profile.dto.js"
import { getUserDAO, getFitDAO, getStyleDAO } from "./profile.dao.js";

export const getInfo = async (userId) => {
    return getInfoDTO(await getUserDAO(userId), await getFitDAO(userId), await getStyleDAO(userId));
}