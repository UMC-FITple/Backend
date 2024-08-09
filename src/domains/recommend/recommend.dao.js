import { config } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { getBodyinfo_sql, getBodyinfoByID_sql, getFitByID_sql, getStyleByID_sql, getMemberFitsByID_sql, getMemberStylesByID_sql, getMemberinfoByID_sql } from "./recommend.sql.js";

// 특정 유저의 체형 정보 get
export const getBodyinfoByID = async (data) => {
    try{
        const conn = await config.getConnection();

        // 체형 데이터 get sql
        const result = await config.query(getBodyinfoByID_sql, [data.uuid]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        console.log('dao error in get_bodyinfo_by_id:', err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 모든 체형 정보 get
export const getBodyinfo = async () => {
    try{
        const conn = await config.getConnection();

        // 체형 데이터 get sql
        const result = await config.query(getBodyinfo_sql, []);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        console.log('dao error in get_bodyinfo:', err);

        // 에러 메세지 수정 필요!
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// 멤버 정보 get (by UUID)
export const getMemberByID = async (data) => {
    try{
        const conn = await config.getConnection();

        // 체형 데이터 get sql
        const result = await config.query(getMemberinfoByID_sql, [data.uuid]);

        conn.release();
        return result[0];
        
    }catch (err) {
        console.log('dao error in get_bodyinfo_by_id:', err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

// // 스타일 id로 스타일 이름 get
// export const getStyleByID = async (data) => {
//     try{
//         const conn = await pool.getConnection();

//         // 체형 데이터 get sql
//         const result = await pool.query(getStyleByID, [data.id]);

//         conn.release();
//         return result[0].insertId;
        
//     }catch (err) {
//         console.log('dao error in get_bodyinfo_by_id:', err);
//         throw new BaseError(status.PARAMETER_IS_WRONG);
//     }
// }

// // 비슷한 스타일 멤버 추천
// export const recommendUser_style = async (data) => {
//     try{
//         const conn = await pool.getConnection();
        
//         // email 중복 확인
//         const [confirm] = await pool.query(confirmEmail, data.email);

//         if(confirm[0].isExistEmail){
//             conn.release();
//             return -1;
//         }

//         // post sql
//         const result = await pool.query(insertUserSql, [data.email, data.name, data.nickname, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

//         conn.release();
//         return result[0].insertId;
        
//     }catch (err) {
//         console.log('user dao error in addUser:', err);
//         throw new BaseError(status.PARAMETER_IS_WRONG);
//     }
// }

// // 선호 스타일 상품 추천
// export const recommendItem = async (data) => {
//     try{
//         const conn = await pool.getConnection();
        
//         // email 중복 확인
//         const [confirm] = await pool.query(confirmEmail, data.email);

//         if(confirm[0].isExistEmail){
//             conn.release();
//             return -1;
//         }

//         // post sql
//         const result = await pool.query(insertUserSql, [data.email, data.name, data.nickname, data.gender, data.birth, data.addr, data.specAddr, data.phone]);

//         conn.release();
//         return result[0].insertId;
        
//     }catch (err) {
//         console.log('user dao error in addUser:', err);
//         throw new BaseError(status.PARAMETER_IS_WRONG);
//     }
// }


// 추천

// 비슷한 체형 사용자 추천
// 특정 유저의 체형 정보 get
export const recommend_user_bodyinfo_byID = async (data) => {
    try{
        const conn = await config.getConnection();

        // // 체형 데이터 get sql
        // const result = await pool.query(getBodyinfoByID, [data.uuid]);

        // 파이썬 서버 연동 부분

        // 체형 데이터 get sql
        const result = await config.query(getBodyinfoByID_sql, [data.uuid]);

        conn.release();
        return result[0].insertId;
        
    }catch (err) {
        console.log('dao error in get_bodyinfo_by_id:', err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}