import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getUser, getFitToUserId, getStyleToUserId, findUserToStyle1, findUserToStyle2 } from "./recommend.sql.js";

export const getStyleDAO = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const result = [];
        const style = await pool.query(getStyleToUserId, userId);
        let recommend;

        if(style[0].length = 1){
            recommend = await pool.query(findUserToStyle1, [userId, style[0][0].style_name]);
        }else if(style[0].length = 2){
            recommend = await pool.query(findUserToStyle2, [userId, style[0][1].style_name, style[0].style_name]);
        }else{
            throw new BaseError(status.MYPROFILE_PREFER_STYLE_LENGHT_ERROR);
        }

        if(recommend[0].length == 0){
            conn.release();
            return -1;
        }else{
            for (let i = 0; i < recommend[0].length; i++) {
                const user = await pool.query(getUser, recommend[0][i].uuid);
                const fit = await pool.query(getFitToUserId, recommend[0][i].uuid);
                const style = await pool.query(getStyleToUserId, recommend[0][i].uuid);
                result.push({user, fit, style});
            }
        }
        conn.release();
        return result;
    } catch (err) {
        if (err.data.code === status.MYPROFILE_PREFER_STYLE_LENGHT_ERROR.code) {
            throw err;
        }
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}