// import mysql from 'mysql2/promise'; // mysql2 패키지 가져오기
// import dotenv from 'dotenv'; // dotenv 패키지 가져오기

// dotenv.config(); // .env 파일의 환경 변수를 로드

// // 데이터베이스 연결 설정
// const pool = mysql.createPool({
//     host: process.env.DB_HOST, // 환경 변수에서 DB_HOST 가져오기
//     user: process.env.DB_USERNAME, // 환경 변수에서 DB_USERNAME 가져오기
//     password: process.env.DB_PASSWORD, // 환경 변수에서 DB_PASSWORD 가져오기
//     database: process.env.DB_DATABASE, // 환경 변수에서 DB_DATABASE 가져오기
// });

// // 사이즈 정보를 가져오는 함수
// const getSizes = async () => {
//     try {
//         const query = 'SELECT * FROM real_size'; // 모든 사이즈 정보를 가져오는 쿼리
//         const [results] = await pool.execute(query); // pool.execute()로 쿼리 실행
//         return results; // 결과 반환
//     } catch (error) {
//         console.error('Error fetching sizes:', error);
//         throw error; // 에러 발생 시 다시 던짐
//     }
// };

// // ES 모듈 방식으로 내보내기
// export { getSizes };

// import mysql from 'mysql2/promise'; // mysql2 패키지 가져오기
// import dotenv from 'dotenv'; // dotenv 패키지 가져오기

// dotenv.config(); // .env 파일의 환경 변수를 로드

// // 데이터베이스 연결 설정
// const pool = mysql.createPool({
//     host: process.env.DB_HOST, // 환경 변수에서 DB_HOST 가져오기
//     user: process.env.DB_USERNAME, // 환경 변수에서 DB_USERNAME 가져오기
//     password: process.env.DB_PASSWORD, // 환경 변수에서 DB_PASSWORD 가져오기
//     database: process.env.DB_DATABASE, // 환경 변수에서 DB_DATABASE 가져오기
// });

// // 사이즈 정보를 가져오는 함수
// // const getSizes = async () => {
// //     try {
// //         const query = 'SELECT * FROM real_size'; // 모든 사이즈 정보를 가져오는 쿼리
// //         const [results] = await pool.execute(query); // pool.execute()로 쿼리 실행
// //         return results; // 결과 반환
// //     } catch (error) {
// //         console.error('Error fetching sizes:', error);
// //         throw new Error('Failed to fetch sizes'); // 에러 발생 시 사용자 정의 에러 메시지
// //     }
// // };
// // 사이즈 정보를 가져오는 함수
// const getSizes = async () => {
//     try {
//         const query = 'SELECT * FROM real_size'; // 모든 사이즈 정보를 가져오는 쿼리
//         const [results] = await pool.execute(query); // pool.execute()로 쿼리 실행
//         return results; // 결과 반환
//     } catch (error) {
//         console.error('Error fetching sizes:', error.message); // 에러 메시지 출력
//         throw new Error(`Failed to fetch sizes: ${error.message}`); // 에러 발생 시 사용자 정의 에러 메시지
//     }
// };


// // ES 모듈 방식으로 내보내기
// export { getSizes };

import mysql from 'mysql2/promise'; // mysql2 패키지 가져오기
import dotenv from 'dotenv'; // dotenv 패키지 가져오기

dotenv.config(); // .env 파일의 환경 변수를 로드

// 데이터베이스 연결 설정
const pool = mysql.createPool({
    host: process.env.DB_HOST, // 환경 변수에서 DB_HOST 가져오기
    user: process.env.DB_USERNAME, // 환경 변수에서 DB_USERNAME 가져오기
    password: process.env.DB_PASSWORD, // 환경 변수에서 DB_PASSWORD 가져오기
    database: process.env.DB_DATABASE, // 환경 변수에서 DB_DATABASE 가져오기
});

// // 사이즈 정보를 가져오는 함수
// const getSizes = async () => {
//     try {
//         const query = 'SELECT * FROM real_size'; // 모든 사이즈 정보를 가져오는 쿼리
//         const [results] = await pool.execute(query); // pool.execute()로 쿼리 실행
//         return results; // 결과 반환
//     } catch (error) {
//         console.error('Error fetching sizes:', error.message); // 에러 메시지 출력
//         throw new Error(`Failed to fetch sizes: ${error.message}`); // 에러 발생 시 사용자 정의 에러 메시지
//     }
// };
// 
// 사이즈 정보를 가져오는 함수
const getSizes = async () => {
    try {
        const query = 'SELECT * FROM real_size'; // 모든 사이즈 정보를 가져오는 쿼리
        console.log('Executing query:', query); // 쿼리 출력
        const [results] = await pool.execute(query); // pool.execute()로 쿼리 실행
        console.log('Query results:', results); // 쿼리 결과 출력
        return results; // 결과 반환
    } catch (error) {
        console.error('Error fetching sizes:', error.message); // 에러 메시지 출력
        throw new Error(`Failed to fetch sizes: ${error.message}`); // 에러 발생 시 사용자 정의 에러 메시지
    }
};



// ES 모듈 방식으로 내보내기
export { getSizes };
