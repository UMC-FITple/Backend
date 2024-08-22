import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getUser, getFitToUserId, getStyleToUserId, getFollowerToUserId, getFollowingToUserId,
    getMyFitSQL, getMyFitCategorySQL, getWishSQL, getWishCategorySQL, getBodyInfoSQL } from "./profile.sql.js";

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

export const getMyFitDAO = async (userId, category) => {
    try {
        const conn = await pool.getConnection();
        if(typeof category == "undefined"){
            const [data] = await pool.query(getMyFitSQL, userId);
            conn.release();
            return data;
        }else{
            const [data] = await pool.query(getMyFitCategorySQL, [userId, category]);
            conn.release();
            return data;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getWishDAO = async (userId, category) => {
    try {
        const conn = await pool.getConnection();
        if(typeof category == "undefined"){
            const [data] = await pool.query(getWishSQL, userId);
            conn.release();
            return data;
        }else{
            const [data] = await pool.query(getWishCategorySQL, [userId, category]);
            conn.release();
            return data;
        }
    } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getBodyInfoDAO = async (userId) => {
    try {
        const conn = await pool.getConnection();
        const user = await pool.query(getBodyInfoSQL, userId);
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