import { previewSearchResponseDTO, previewClothResponseDTO, SearchResultResponseDTO, SearchBrandResponseDTO } from "./search.dto.js"
import { getNicknameToClothId, 
    getPreviewCloth, getUserToClothId, 
    getNicknameToClothName, getPreviewBrand, getPreviewUser, 
    getBrand, getNicknameToBrand } from "./search.dao.js";

export const getSearch = async (query) => {
    const { category, size = 8, clothId } = query;

    return previewSearchResponseDTO(await getNicknameToClothId(category, size, clothId));
}

export const getCloth = async (clothId) => {

    return previewClothResponseDTO(await getPreviewCloth(clothId), await getUserToClothId(clothId));
}

export const getSearchResult = async (query) => {
    const { name, category, size = 8, clothId } = query;

    return SearchResultResponseDTO(await getNicknameToClothName(name, category, size, clothId), await getPreviewBrand(name), await getPreviewUser(name));
}

export const getSearchBrand = async (brandId, query) => {
    const { name, category, size = 8 } = query;
    console.log("\nprovider", brandId);

    return SearchBrandResponseDTO(await getBrand(brandId), await getNicknameToBrand(brandId, name, category, size));
}