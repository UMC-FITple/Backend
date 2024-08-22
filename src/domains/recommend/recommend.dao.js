import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getBodyinfo_sql, getMemberFitsByID_sql, getMemberStylesByID_sql, getMemberinfoByID_sql, getBodyinfoByID_sql, getMemberStyles_sql } from "./recommend.sql.js";

// 특정 유저의 체형 정보 get
export const getBodyinfoByID = async (uuid) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(getBodyinfoByID_sql, [uuid]);

        console.log('bodyinfo: ',result);

        conn.release();
        return result;
    }catch (err) {
        console.log('dao error in get_bodyinfo_byUUID:', err);

        // 에러 메세지 수정 필요!
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 모든 체형 정보 get
export const getBodyinfo = async () => {
    try{
        const conn = await pool.getConnection();

        // 체형 데이터 get sql
        const result = await pool.query(getBodyinfo_sql);

        console.log('bodyinfoes: ', result);

        conn.release();
        return result[0];
        
    }catch (err) {
        console.log('dao error in get_bodyinfo:', err);

        // 에러 메세지 수정 필요!
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 멤버 정보 get (by UUID)
export const getMemberByID = async (uuid) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(getMemberinfoByID_sql, [uuid]);

        console.log('member: ', result);

        conn.release();
        return result;
        
    }catch (err) {
        console.log('dao error in get_bodyinfo_by_id:', err);
        throw new BaseError(status.NOT_FOUND);
    }
}

// 유저-핏 정보 get (by UUID)
export const getUserFitByID = async (uuid) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(getMemberFitsByID_sql, [uuid]);

        console.log("fit: ", result);

        conn.release();
        return result;
    }catch (err) {
        console.log('dao error in get_user_fit_by_id:', err);
        throw new BaseError(status.NOT_FOUND);
    }
}

// 유저-스타일 정보 get (by UUID)
export const getUserStyleByID = async (uuid) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(getMemberStylesByID_sql, [uuid]);

        console.log("style: ". result);

        conn.release();
        return result;
        
    }catch (err) {
        console.log('dao error in get_user_fit_by_id:', err);
        throw new BaseError(status.NOT_FOUND);
    }
}

// 유저-스타일 정보 get (by UUID)
export const getUserStyle = async () => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(getMemberStyles_sql, []);

        console.log("style: ". result);

        conn.release();
        return result;
        
    }catch (err) {
        console.log('dao error in get_user_fit_by_id:', err);
        throw new BaseError(status.NOT_FOUND);
    }
}