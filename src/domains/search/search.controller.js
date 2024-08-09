import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getSearch, getCloth, getSearchResult, getSearchBrand } from "./search.provider.js";

export const searchPreview = async (req, res, next) => {
    console.log("검색 메인화면을 조회합니다");
    res.send(response(status.SUCCESS, await getSearch(req.query)));
}

export const clothView = async (req, res, next) => {
    console.log("아이템 상세정보를 조회합니다");
    res.send(response(status.SUCCESS, await getCloth(req.params.clothId)));
}

export const searchView = async (req, res, next) => {
    console.log("검색 결과를 조회합니다");
    res.send(response(status.SUCCESS, await getSearchResult(req.query)));
}

export const brandView = async (req, res, next) => {
    console.log("브랜드 검색 결과를 조회합니다");
    res.send(response(status.SUCCESS, await getSearchBrand(req.params.brandId, req.query)));
}
