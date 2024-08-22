import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getUser, getFitToUserId, getStyleToUserId, getFollowerToUserId, getFollowingToUserId } from "./profile.sql.js";

export const getUserDAO = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const user = await pool.query(getUser, userId);
        if(user[0].length == 0 ){
            conn.release();
            return -1;
        }
        conn.release();
        return user;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getFitDAO = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const fit = await pool.query(getFitToUserId, userId);
        if(fit[0].length == 0 ){
            conn.release();
            return -1;
        }
        conn.release();
        return fit;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getStyleDAO = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const style = await pool.query(getStyleToUserId, userId);
        if(style[0].length == 0 ){
            conn.release();
            return -1;
        }
        conn.release();
        return style;
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getFollowDAO = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const follower = await pool.query(getFollowerToUserId, userId);
        const following = await pool.query(getFollowingToUserId, userId);

        conn.release();
        return { follower, following };
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}