import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { myClosetItemAtFirst, myClosetItem, myClosetCategoryItemAtFirst, myClosetCategoryItem, 
    getClothByClothId } from "./closet.sql.js";

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

export const getPreviewCloth = async (clothId) => {
    try {
        console.log("dao getPreviewCloth");
        const conn = await pool.getConnection();
        const cloth = await pool.query(getClothByClothId, clothId);

        conn.release();
            
        return cloth;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}