import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일의 환경 변수 로드

const pool = mysql.createPool({
    host: process.env.DB_HOST, // RDS 엔드포인트
    user: process.env.DB_USERNAME, // RDS 사용자 이름
    password: process.env.DB_PASSWORD, // RDS 비밀번호
    database: process.env.DB_DATABASE, // 데이터베이스 이름
});

// 이미지 경로를 DB에 저장하는 로직 구현
export const saveImageToDB = async (imagePath) => {
    const sql = 'INSERT INTO images (path) VALUES (?)';
    const [result] = await pool.execute(sql, [imagePath]);
    return result.insertId; // 저장된 이미지 경로의 ID 반환
};
