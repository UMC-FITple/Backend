// import mysql from 'mysql2/promise'; 
// import dotenv from 'dotenv'; 

// dotenv.config(); // .env 파일의 환경 변수를 로드

// // 데이터베이스 연결 설정
// const pool = mysql.createPool({
//     host: process.env.DB_HOST, // 환경 변수에서 DB_HOST 가져오기
//     user: process.env.DB_USERNAME, // 환경 변수에서 DB_USERNAME 가져오기
//     password: process.env.DB_PASSWORD, // 환경 변수에서 DB_PASSWORD 가져오기
//     database: process.env.DB_DATABASE, // 환경 변수에서 DB_DATABASE 가져오기
// });

// const getSizes = async () => {
//     try {
//         const query = 'SELECT * FROM real_size'; // 모든 사이즈 정보를 가져오는 쿼리
//         console.log('Executing query:', query); // 쿼리 출력
//         const [results] = await pool.execute(query); // pool.execute()로 쿼리 실행
//         console.log('Query results:', results); // 쿼리 결과 출력
//         return results; // 결과 반환
//     } catch (error) {
//         console.error('Error fetching sizes:', error.message); // 에러 메시지 출력
//         throw new Error(`Failed to fetch sizes: ${error.message}`); // 에러 발생 시 사용자 정의 에러 메시지
//     }
// };

// export { getSizes };
// src/daos/ocr.dao.js
// import { db } from '../config/database'; // 데이터베이스 연결 설정

// export const getRealSize = async (clothId) => {
//     const [rows] = await db.query('SELECT * FROM real_size WHERE cloth_id = ?', [clothId]);
//     return rows[0]; // 첫 번째 결과 반환
// };

// import mysql from 'mysql2/promise'; 
// import dotenv from 'dotenv'; 

// dotenv.config(); // .env 파일의 환경 변수를 로드

// // 데이터베이스 연결 설정
// const pool = mysql.createPool({
//     host: process.env.DB_HOST, // 환경 변수에서 DB_HOST 가져오기
//     user: process.env.DB_USERNAME, // 환경 변수에서 DB_USERNAME 가져오기
//     password: process.env.DB_PASSWORD, // 환경 변수에서 DB_PASSWORD 가져오기
//     database: process.env.DB_DATABASE, // 환경 변수에서 DB_DATABASE 가져오기
// });

// export const getSavedSize = async () => {
//   // DB에서 이전에 저장된 옷 사이즈 정보 가져오기
//   const [result] = await db.query('SELECT * FROM real_size WHERE cloth_id = ?', [clothId]);
//   return result[0];
// };

// const getRealSize = async (userId) => {
//     return await db.RealSize.findOne({
//         where: { userId },
//     });
// };

// const getImagePath = async (imageId) => {
//     const image = await db.Image.findOne({
//         where: { id: imageId },
//         attributes: ['imagePath'],
//     });
//     return image.imagePath;
// };

// export default {
//     getRealSize,
//     getImagePath,
// };

// import mysql from 'mysql2/promise'; 
// import dotenv from 'dotenv'; 

// dotenv.config(); // .env 파일의 환경 변수를 로드

// // 데이터베이스 연결 설정
// const pool = mysql.createPool({
//     host: process.env.DB_HOST, // 환경 변수에서 DB_HOST 가져오기
//     user: process.env.DB_USERNAME, // 환경 변수에서 DB_USERNAME 가져오기
//     password: process.env.DB_PASSWORD, // 환경 변수에서 DB_PASSWORD 가져오기
//     database: process.env.DB_DATABASE, // 환경 변수에서 DB_DATABASE 가져오기
// });

// export default {
//     async getRealSize(userId) {
//       try {
//         console.log('Fetching real size for userId:', userId);
//         const result = await db.real_size.findOne({
//           where: { id: userId },
//         });
//         console.log('Real size result:', result);
//         return result;
//       } catch (error) {
//         console.error('Error getting real size:', error);
//         throw error;
//       }
//     },
  
//     async getImagePath(imageId) {
//       try {
//         console.log('Fetching image path for imageId:', imageId);
//         const image = await db.iamges.findOne({
//           where: { id: imageId },
//           attributes: ['imagePath'],
//         });
//         console.log('Image path:', image.imagePath);
//         return image.imagePath;
//       } catch (error) {
//         console.error('Error getting image path:', error);
//         throw error;
//       }
//     },
//   };

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일의 환경 변수를 로드

// 데이터베이스 연결 설정
const connection = await mysql.createConnection({
    host: process.env.DB_HOST, // 환경 변수에서 DB_HOST 가져오기
    user: process.env.DB_USERNAME, // 환경 변수에서 DB_USERNAME 가져오기
    password: process.env.DB_PASSWORD, // 환경 변수에서 DB_PASSWORD 가져오기
    database: process.env.DB_DATABASE, // 환경 변수에서 DB_DATABASE 가져오기
});

export default {
    async getRealSize(userId) {
        try {
            console.log('Fetching real size for userId:', userId);
            const [rows] = await connection.execute(
                'SELECT * FROM real_size WHERE id = ?',
                [userId]
            );
            console.log('Real size result:', rows);
            return rows[0];
        } catch (error) {
            console.error('Error getting real size:', error);
            throw error;
        }
    },

    async getImagePath(imageId) {
        try {
            console.log('Fetching image path for imageId:', imageId);
            const [rows] = await connection.execute(
                'SELECT imagePath FROM images WHERE id = ?',
                [imageId]
            );
            console.log('Image path:', rows[0].imagePath);
            return rows[0].imagePath;
        } catch (error) {
            console.error('Error getting image path:', error);
            throw error;
        }
    },
};
