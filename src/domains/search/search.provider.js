import { previewSearchResponseDTO, previewClothResponseDTO, SearchResultResponseDTO, SearchBrandResponseDTO } from "./search.dto.js"
import { getNicknameToClothId, 
    getPreviewCloth, getUserToClothId, 
    getNicknameToClothName, getPreviewBrand, getPreviewUser, 
    getBrand, getNicknameToBrand } from "./search.dao.js";

export const getSearch = async (query) => {
    const { category } = query;

    return previewSearchResponseDTO(await getNicknameToClothId(category));
}

export const getCloth = async (clothId) => {

    return previewClothResponseDTO(await getPreviewCloth(clothId), await getUserToClothId(clothId));
}

export const getSearchResult = async (query) => {
    const { name, category } = query;

    return SearchResultResponseDTO(await getNicknameToClothName(name, category), await getPreviewBrand(name), await getPreviewUser(name));
}

export const getSearchBrand = async (brandId, query) => {
    const { name, category } = query;

    return SearchBrandResponseDTO(await getBrand(brandId), await getNicknameToBrand(brandId, name, category));
}