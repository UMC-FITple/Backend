import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { myClosetItem, myClosetCategoryItem, myClosetSearchItem, myClosetSearchCategoryItem,
    getClothByClothId, getUserByClothId, getRealSizeByClothId,
    brandToBrandName, insertBrand, getBrand, insertCloth, insertRealSize, getCloth,
    updateCloth, updateRealSize, myClothSizeDel, myClothWishDel, myClothDel } from "./closet.sql.js";

// cloth 반환
    export const getMyClosetPreview = async (userId, name, category) => {
    try {
        const conn = await pool.getConnection();
        
        if(typeof name == "undefined" && typeof category == "undefined"){
            const [data] = await pool.query(myClosetItem, userId);
            conn.release();
            return data;
        }else if(typeof name == "undefined"){
            const [data] = await pool.query(myClosetCategoryItem, [userId, category]);
            conn.release();
            return data;
        }else if(typeof category == "undefined"){
            const [data] = await pool.query(myClosetSearchItem, [userId, name, name]);
            conn.release();
            return data;
        }else{
            const [data] = await pool.query(myClosetSearchCategoryItem, [userId, name, name, category]);
            conn.release();
            return data;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


export const getPreviewCloth = async (userId, clothId) => {
    try {
        const conn = await pool.getConnection();
        
        const clothUser = await pool.query(getUserByClothId, clothId);
        if(clothUser[0].length == 0){
            throw new BaseError(status.NOT_FOUND);
        }

        const cloth = await pool.query(getClothByClothId, [userId, clothId]);
        if(cloth[0].length == 0){
            throw new BaseError(status.FORBIDDEN);
        }

        const size = await pool.query(getRealSizeByClothId, clothId);
        conn.release();
        return { cloth, size };
    } catch (err) {
        if (err.data.code === status.NOT_FOUND.code || status.FORBIDDEN.code) {
            throw err;
        }
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

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

// Brand 데이터 삽입
export const brandAdd = async (data) => {
    try{
        const conn = await pool.getConnection();
        const brand = await pool.query(insertBrand, data.brand);

        conn.release();
        return brand[0].insertId;
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 등록한 Brand 반환
export const getAddBrand = async (brandId) => {
    try {
        const conn = await pool.getConnection();
        const brand = await pool.query(getBrand, brandId);

        if(brand.length == 0){
            conn.release();
            return -1;
        }

        conn.release();
        return brand;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// Cloth 데이터 삽입
export const clothAdd = async (data) => {
    try{
        const conn = await pool.getConnection();

        const cloth = await pool.query(insertCloth, [data.uuid, data.image, data.brand, data.name, data.product_code, data.category, data.size, data.fit, data.color, data.url, data.rating, data.memo]);
        const size = await pool.query(insertRealSize, [cloth[0].insertId, data.length, data.shoulder, data.chest, data.armhole, data.sleeve, data.sleeve_length, data.hem]);

        conn.release();
        return cloth[0].insertId;
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 등록한 Cloth 반환
export const getAddCloth = async (clothId) => {
    try {
        const conn = await pool.getConnection();
        const cloth = await pool.query(getCloth, clothId);

        if(cloth.length == 0){
            return -1;
        }

        conn.release();
        return cloth;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// Cloth 수정
export const clothPut = async (data) => {
    try{
        const conn = await pool.getConnection();

        pool.query(updateCloth, [data.image, data.brand, data.name, data.product_code, data.category, data.size, data.fit, data.color, data.url, data.rating, data.memo, data.uuid, data.clothId]);
        pool.query(updateRealSize, [data.length, data.shoulder, data.chest, data.armhole, data.sleeve, data.sleeve_length, data.hem, data.clothId]);
        const cloth = await pool.query(getCloth, data.clothId);
        
        conn.release();
        return cloth;
    }catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// Cloth 삭제
export const clothDel = async (userId, clothId) => {
    try {
        const conn = await pool.getConnection();
        await pool.query(myClothSizeDel, parseInt(clothId));
        await pool.query(myClothWishDel, parseInt(clothId));
        await pool.query(myClothDel, [userId, parseInt(clothId)]);
        const cloth = await pool.query(getCloth, parseInt(clothId));

        console.log(cloth);
        if(!cloth[0].length == 0){
            conn.release();
            return -1;
        }

        conn.release();
        return cloth;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}