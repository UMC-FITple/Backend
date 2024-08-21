import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { myClosetItemAtFirst, myClosetItem, myClosetCategoryItemAtFirst, myClosetCategoryItem, 
    getClothByClothId, getUserByClothId, getRealSizeByClothId,
    insertCloth, insertRealSize, getCloth } from "./closet.sql.js";

// ncloth 반환
    export const getMyClosetPreview = async (userId, category, size, cursorId) => {
    try {
        const conn = await pool.getConnection();
        
        if(typeof category == "undefined"){
            if(typeof cursorId == "undefined"){
                const [data] = await pool.query(myClosetItemAtFirst, [userId, size]);
                conn.release();
                return data;
            }else{
                const [data] = await pool.query(myClosetItem, [userId, cursorId, size]);
                conn.release();
                return data;
            }
        }else{
            if(typeof cursorId == "undefined"){
                const [data] = await pool.query(myClosetCategoryItemAtFirst, [userId, category, size]);
                conn.release();
                return data;
            }else{
                const [data] = await pool.query(myClosetCategoryItem, [userId, category, cursorId, size]);
                conn.release();
                return data;
            }
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