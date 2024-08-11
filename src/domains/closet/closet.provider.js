import { previewMyClosetResponseDTO, previewMyClothResponseDTO } from "./closet.dto.js"
import { getMyClosetPreview, getPreviewCloth } from "./closet.dao.js";

export const getMyCloset = async (userId, query) => {
    const { category, size = 8, clothId } = query;

    return previewMyClosetResponseDTO(await getMyClosetPreview(userId, category, size, clothId));
}

export const getMyCloth = async (userId, clothId) => {

    return previewMyClothResponseDTO(await getPreviewCloth(userId, clothId));
}