import { getStyleDTO } from "./recommend.dto.js"
import { getStyleDAO } from "./recommend.dao.js";

export const getStyle = async (userId) => {
    return getStyleDTO(await getStyleDAO(userId));
}