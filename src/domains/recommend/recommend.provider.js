import { getBodyInfoDTO } from "./recommend.dto.js"
import { getBodyInfoDAO } from "./recommend.dao.js";

export const getBodyInfo = async (userId) => {
    return getBodyInfoDTO(await getBodyInfoDAO(userId));
}