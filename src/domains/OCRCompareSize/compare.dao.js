import db from '../database'; // 데이터베이스 연결 모듈

export const getSizes = async () => {
    // 데이터베이스에서 사이즈 정보를 가져오는 로직
    const sizes = await db.query('SELECT * FROM sizes');
    return sizes;
};
