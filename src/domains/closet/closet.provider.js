import { previewMyClosetResponseDTO, previewMyClothResponseDTO } from "./closet.dto.js"
import { getNicknameToClothId, getPreviewCloth } from "./closet.dao.js";

export const getMyCloset = async (query) => {
    const { category, size = 8, clothId } = query;

    console.log("provider",query);

    return previewMyClosetResponseDTO(await getNicknameToClothId(category, size, clothId));
}

export const getMyCloth = async (clothId) => {

    return previewMyClothResponseDTO(await getPreviewCloth(clothId));
}