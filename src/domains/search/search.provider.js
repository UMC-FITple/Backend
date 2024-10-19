import { previewSearchResponseDTO, previewClothResponseDTO, SearchResultResponseDTO, SearchBrandResponseDTO,
    previewMyClothResponseDTO, getWishDTO, getFollowDTO } from "./search.dto.js"
import { getNicknameToClothId, getPreviewCloth, getUserToClothId, getNicknameToClothName, getPreviewBrand, getPreviewUser, 
    getBrand, getNicknameToBrand, getPreviewMyCloth, getWishDAO, getFollowDAO } from "./search.dao.js";

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

export const getMyCloth = async (userId, clothId) => {

    return previewMyClothResponseDTO(await getPreviewMyCloth(userId, clothId));
}

export const getMyWish = async (userId, clothId) => {

    return getWishDTO(await getWishDAO(userId, clothId));
}

export const getMyFollow = async (userId, clothId) => {

    return getFollowDTO(await getFollowDAO(userId, clothId));
}