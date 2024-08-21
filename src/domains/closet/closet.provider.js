import { previewMyClosetResponseDTO, previewMyClothResponseDTO, SearchBrandResponseDTO } from "./closet.dto.js"
import { getMyClosetPreview, getPreviewCloth, getPreviewBrand } from "./closet.dao.js";

export const getMyCloset = async (userId, query) => {
    const { category, size = 8, clothId } = query;

    return previewMyClosetResponseDTO(await getMyClosetPreview(userId, category, size, clothId));
}

export const getMyCloth = async (userId, clothId) => {

    return previewMyClothResponseDTO(await getPreviewCloth(userId, clothId));
}

export const getBrand = async (query) => {
    const { name } = query;

    return SearchBrandResponseDTO(await getPreviewBrand(name));
}