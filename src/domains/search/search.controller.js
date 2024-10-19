import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { getSearch, getCloth, getSearchResult, getSearchBrand, getMyCloth, getMyWish, getMyFollow } from "./search.provider.js";
import { addMyCloth, addMyWish, delMyWish, addMyFollow, delMyFollow } from "./search.service.js";

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

export const addClothPreview = async (req, res, next) => {
    console.log("옷 추가를 요청하였습니다!");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getMyCloth(userId, req.params.clothId)));
}

export const addCloth = async (req, res, next) => {
    console.log("옷 등록을 요청하였습니다!");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await addMyCloth(userId, req.body)));
}

export const addWish = async (req, res, next) => {
    console.log("관심 있는 옷 추가를 요청하였습니다!");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await addMyWish(userId, req.params.clothId)));
}

export const delWish = async (req, res, next) => {
    console.log("관심 있는 옷 삭제를 요청하였습니다!");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await delMyWish(userId, req.params.clothId)));
}

export const getWish = async (req, res, next) => {
    console.log("관심 있는 옷 조회를 요청하였습니다!");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getMyWish(userId, req.params.clothId)));
}

export const addFollow = async (req, res, next) => {
    console.log("팔로우를 요청하였습니다!");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await addMyFollow(userId, req.params.clothId)));
}

export const delFollow = async (req, res, next) => {
    console.log("팔로우 취소를 요청하였습니다!");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await delMyFollow(userId, req.params.clothId)));
}

export const getFollow = async (req, res, next) => {
    console.log("팔로우 조회를 요청하였습니다!");
    const userId = res.locals.uuid;
    res.send(response(status.SUCCESS, await getMyFollow(userId, req.params.clothId)));
}