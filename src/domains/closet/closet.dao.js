import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { UserNicknameToClothIdAtFirst, UserNicknameToClothId, UserCategoryToClothIdAtFirst, UserCategoryToClothId, 
    getClothByClothId } from "./closet.sql.js";

// nickname+cloth 반환
    export const getNicknameToClothId = async (category, size, cursorId) => {
    try {
        const conn = await pool.getConnection();
        
        console.log("카테고리 : ", category);
        console.log("옷 id : ", cursorId);
        if(category == "undefined" || typeof category == "undefined" || category == null){
            if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
                const [data] = await pool.query(UserNicknameToClothIdAtFirst, [size]);
                conn.release();
                console.log("dao1", data);
                return data;
            }else{
                const [data] = await pool.query(UserNicknameToClothId, [cursorId, size]);
                conn.release();
                console.log("dao2", data);
                return data;
            }
        }else{
            if(cursorId == "undefined" || typeof cursorId == "undefined" || cursorId == null){
                const [data] = await pool.query(UserCategoryToClothIdAtFirst, [category, size]);
                conn.release();
                console.log("dao1", data);
                return data;
            }else{
                const [data] = await pool.query(UserCategoryToClothId, [category, cursorId, size]);
                conn.release();
                console.log("dao2", data);
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