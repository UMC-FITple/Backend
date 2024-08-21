import { query } from "express";
import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { UserNicknameToClothIdAtFirst, UserNicknameToClothId, UserCategoryToClothIdAtFirst, UserCategoryToClothId, 
    getClothByClothId, getUserIdToClothId, getUser, getFitToUserId, getStyleToUserId, 
    UserNicknameToClothNameAtFirst, UserNicknameToClothName, UserCategoryToClothNameAtFirst, UserCategoryToClothName, 
    brandToBrandName, userIdToNickname, userToNickname, getBrandToBrandId, UserNicknameToBrand } from "./search.sql.js";

// nickname+cloth 반환
    export const getNicknameToClothId = async (category, size, cursorId) => {
    try {
        const conn = await pool.getConnection();
        
        if(typeof category == "undefined"){
            if(typeof cursorId == "undefined"){
                const [data] = await pool.query(UserNicknameToClothIdAtFirst);
                conn.release();
                return data;
            }else{
                const [data] = await pool.query(UserNicknameToClothId, cursorId);
                conn.release();
                return data;
            }
        }else{
            if(typeof cursorId == "undefined"){
                const [data] = await pool.query(UserCategoryToClothIdAtFirst, category);
                conn.release();
                return data;
            }else{
                const [data] = await pool.query(UserCategoryToClothId, [category, cursorId]);
                conn.release();
                return data;
            }
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getPreviewCloth = async (clothId) => {
    try {
        const conn = await pool.getConnection();
        const cloth = await pool.query(getClothByClothId, clothId);

        conn.release();
            
        return cloth;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// user 정보 반환
export const getUserToClothId = async (clothId) => {
    try {
        const conn = await pool.getConnection();
        const userData =await pool.query(getUserIdToClothId, clothId);

        const userId = userData[0][0].uuid;
        const user = await pool.query(getUser, userId);
        const fit = await pool.query(getFitToUserId, userId);
        const style = await pool.query(getStyleToUserId, userId);

        if(user.length == 0){
            return -1;
        }

        conn.release();
        return [ user, fit, style ];
        
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


// nickname+cloth 반환
export const getNicknameToClothName = async (clothName, category, cursorId) => {
    try {
        const conn = await pool.getConnection();
        
        if(typeof category == "undefined"){
            if(typeof cursorId == "undefined"){
                const [data] = await pool.query(UserNicknameToClothNameAtFirst, clothName);
                conn.release();
                return data;
            }else{
                const [data] = await pool.query(UserNicknameToClothName, [clothName, cursorId]);
                conn.release();
                return data;
            }
        }else{
            if(typeof cursorId == "undefined"){
                const [data] = await pool.query(UserCategoryToClothNameAtFirst, [clothName, category]);
                conn.release();
                return data;
            }else{
                const [data] = await pool.query(UserCategoryToClothName, [clothName, category, cursorId]);
                conn.release();
                return data;
            }
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 통합검색 brand 조회
export const getPreviewBrand = async (brandName) => {
    try {
        const conn = await pool.getConnection();
        const [data] = await pool.query(brandToBrandName, brandName);
        conn.release();
        return data;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 통합검색 user 조회
export const getPreviewUser = async (userName) => {
    try {
        const conn = await pool.getConnection();
        const [userData] = await pool.query(userIdToNickname, userName);
        const result = [];

        if(userData.length == 0){
            console.log("-1");
            return -1;
        }else{
            for (let i = 0; i < userData.length; i++) {
                const userId = userData[i].uuid;
                const [user] = await pool.query(userToNickname, userId);
                const [fit] = await pool.query(getFitToUserId, userId);
                const [style] = await pool.query(getStyleToUserId, userId);
                result.push({user, fit, style});
            }
            conn.release();
            console.log(result);
            return result;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


// brand 상세 조회
export const getBrand = async (brandId) => {
    try {
        const conn = await pool.getConnection();
        const [brand] = await pool.query(getBrandToBrandId, brandId);

        conn.release();
        return brand;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// brand cloth 조회
export const getNicknameToBrand = async (brandId, clothName, category, size) => {
    try {
        const conn = await pool.getConnection();
        let query = UserNicknameToBrand;

        if(typeof clothName == "undefined" && typeof category == "undefined"){
            query += "ORDER BY c.id DESC LIMIT ? ;";
            const [data] = await pool.query(query, [brandId, size]);
            conn.release();
            return data;
        }else if(typeof clothName == "undefined"){
            query += "WHERE c.category_id = ? ORDER BY c.id DESC LIMIT ? ;"
            const [data] = await pool.query(query, [brandId, category, size]);
            conn.release();
            return data;
        }else if(typeof category == "undefined"){
            query += "WHERE c.name REGEXP ? ORDER BY c.id DESC LIMIT ? ;"
            const [data] = await pool.query(query, [brandId, clothName, size]);
            conn.release();
            return data;
        }else{
            query += "WHERE c.name REGEXP ? AND c.category_id = ? ORDER BY c.id DESC LIMIT ? ;"
            const [data] = await pool.query(query, [brandId, clothName, category, size]);
            conn.release();
            return data;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}