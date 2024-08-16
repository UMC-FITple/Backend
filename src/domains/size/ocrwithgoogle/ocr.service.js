// // import vision from '@google-cloud/vision';
// // import mysql from 'mysql2/promise'; 
// // import dotenv from 'dotenv';
// // import { getSizes } from './ocr.dao.js';

// dotenv.config();
// // const { getSizes } = require('./ocr.dao'); // DAO 모듈 가져오기

// const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
// });

// const detectText = async (imagePath) => {
//     try {
//         const [result] = await client.textDetection(imagePath);
//         const detections = result.textAnnotations;
//         console.log('Text Detection Result:', detections); // 감지된 텍스트 출력
//         return detections.length > 0 ? detections[0].description : "No text detected";
//     } catch (error) {
//         console.error('Error during text detection:', error);
//         throw new Error('Text detection failed');
//     }
// };

// const findClosestSize = async (extractedMeasurements) => {
//     const sizes = await getSizes(); // 사이즈 정보 가져오기

//     if (!sizes || sizes.length === 0) {
//         console.error('Sizes array is empty or undefined');
//         return null; // 혹은 적절한 기본값 반환
//     }

//     let closestSize = null;
//     let minDifference = Infinity;

//     sizes.forEach(size => {
//         let difference = 0;

//         // 각 측정값의 차이를 계산
//         difference += Math.abs(size.length - extractedMeasurements.length);
//         difference += Math.abs(size.shoulder - extractedMeasurements.shoulder);
//         difference += Math.abs(size.chest - extractedMeasurements.chest);
//         difference += size.armhole !== null ? Math.abs(size.armhole - extractedMeasurements.armhole) : 0;
//         difference += size.sleeve !== null ? Math.abs(size.sleeve - extractedMeasurements.sleeve) : 0;
//         difference += Math.abs(size.sleeve_length - extractedMeasurements.sleeve_length);
//         difference += size.hem !== null ? Math.abs(size.hem - extractedMeasurements.hem) : 0;

//         // 가장 작은 차이를 가진 사이즈 찾기
//         if (difference < minDifference) {
//             minDifference = difference;
//             closestSize = size;
//         }
//     });

//     return closestSize;
// };


// const extractMeasurements = (detectedDataString) => {
//     const measurements = {
//         length: 0,
//         shoulder: 0,
//         chest: 0,
//         armhole: 0,
//         sleeve: 0,
//         sleeve_length: 0,
//         hem: 0,
//     };

//     // 문자열을 줄바꿈이나 스페이스를 기준으로 나누어 배열로 변환
//     const detectedData = detectedDataString.split(/\s+/);

//     // 숫자 값만 필터링하여 배열로 변환
//     const values = detectedData.map(item => parseFloat(item)).filter(num => !isNaN(num));

//     // 매핑 순서에 따라 값을 할당
//     if (values.length >= 4) {
//         measurements.length = values[0]; // 총장
//         measurements.shoulder = values[1]; // 어깨너비
//         measurements.chest = values[2]; // 가슴단면
//         measurements.sleeve_length = values[3]; // 소매길이
//     }

//     console.log('Extracted Measurements:', measurements); // 추출된 측정값 출력
//     return measurements;
// };

// // 예시 호출
// const detectedDataString = "1 cm 총장 MY 1 78 2 어깨너비 3 가슴단면 가지고 계신 제품의 실측을 입력해 보세요. 4 소매길이 48 59 20.5 2 79 52 62 21.5 3 81 55 65 22.5";
// extractMeasurements(detectedDataString);

// export default {
//     detectText,
//     findClosestSize,
//     extractMeasurements,
// };

// import vision from '@google-cloud/vision';
// import mysql from 'mysql2/promise'; 
// import dotenv from 'dotenv';
// import { getSizes } from './ocr.dao.js';

// dotenv.config();



// // 데이터베이스 연결
// const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
// });

// const detectText = async (imagePath) => {
//     try {
//         const [result] = await client.textDetection(imagePath);
//         const detections = result.textAnnotations;
//         console.log('Text Detection Result:', detections); // 감지된 텍스트 출력
//         return detections.length > 0 ? detections[0].description : "No text detected";
//     } catch (error) {
//         console.error('Error during text detection:', error);
//         throw new Error('Text detection failed');
//     }
// };

// const findClosestSize = async (extractedMeasurements) => {
//     const sizes = await getSizes(); // 사이즈 정보 가져오기

//     if (!sizes || sizes.length === 0) {
//         console.error('Sizes array is empty or undefined');
//         return null; // 혹은 적절한 기본값 반환
//     }

//     let closestSize = null;
//     let minDifference = Infinity;

//     sizes.forEach(size => {
//         let difference = 0;

//         // 각 측정값의 차이를 계산
//         difference += Math.abs(size.length - extractedMeasurements.length);
//         difference += Math.abs(size.shoulder - extractedMeasurements.shoulder);
//         difference += Math.abs(size.chest - extractedMeasurements.chest);
//         difference += size.armhole !== null ? Math.abs(size.armhole - extractedMeasurements.armhole) : 0;
//         difference += size.sleeve !== null ? Math.abs(size.sleeve - extractedMeasurements.sleeve) : 0;
//         difference += Math.abs(size.sleeve_length - extractedMeasurements.sleeve_length);
//         difference += size.hem !== null ? Math.abs(size.hem - extractedMeasurements.hem) : 0;

//         // 가장 작은 차이를 가진 사이즈 찾기
//         if (difference < minDifference) {
//             minDifference = difference;
//             closestSize = size;
//         }
//     });

//     return closestSize;
// };

// // 사용자가 올린 이미지에서 텍스트를 추출하고, 가장 가까운 사이즈를 찾는 메소드
// const uploadAndDetect = async (imagePath) => {
//     try {
//         const detectedText = await detectText(imagePath); // 텍스트 감지
//         const extractedMeasurements = extractMeasurements(detectedText); // 측정값 추출
//         const closestSize = await findClosestSize(extractedMeasurements); // 가장 가까운 사이즈 찾기

//         return closestSize; // 결과 반환
//     } catch (error) {
//         console.error('Error in uploadAndDetect:', error);
//         throw new Error('Failed to upload and detect');
//     }
// };

// const extractMeasurements = (detectedDataString) => {
//     const measurements = {
//         length: 0,
//         shoulder: 0,
//         chest: 0,
//         armhole: null, // 기본값을 null로 설정
//         sleeve: null,  // 기본값을 null로 설정
//         sleeve_length: 0,
//         hem: null,     // 기본값을 null로 설정
//     };

//     // 문자열을 공백을 기준으로 나누어 배열로 변환
//     const detectedData = detectedDataString.split(/\s+/);

//     // 숫자 값만 필터링하여 배열로 변환
//     const values = detectedData.map(item => parseFloat(item)).filter(num => !isNaN(num));

//     // 매핑 순서에 따라 값을 할당
//     if (values.length >= 4) {
//         measurements.length = values[0]; // 총장
//         measurements.shoulder = values[1]; // 어깨너비
//         measurements.chest = values[2]; // 가슴단면
//         measurements.sleeve_length = values[3]; // 소매길이
//     }

//     console.log('Extracted Measurements:', measurements); // 추출된 측정값 출력
//     return measurements;
// };

// // 예시 호출 (테스트용)
// const detectedDataString = "1 cm 총장 MY 1 78 2 어깨너비 3 가슴단면 가지고 계신 제품의 실측을 입력해 보세요. 4 소매길이 48 59 20.5 2 79 52 62 21.5 3 81 55 65 22.5";
// const measurements = extractMeasurements(detectedDataString);
// console.log(measurements); // 추출된 측정값 출력

// export default {
//     detectText,
//     findClosestSize,
//     extractMeasurements,
//     uploadAndDetect, // 새로 추가된 메소드
// };

// 

// import vision from '@google-cloud/vision';
// import mysql from 'mysql2/promise'; 
// import dotenv from 'dotenv';
// import { getSizes } from './ocr.dao.js';

// dotenv.config();



// // 데이터베이스 연결
// const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
// });

// const detectText = async (imagePath) => {
//     try {
//         const [result] = await client.textDetection(imagePath);
//         const detections = result.textAnnotations;
//         console.log('Text Detection Result:', detections); // 감지된 텍스트 출력
//         return detections.length > 0 ? detections[0].description : "No text detected";
//     } catch (error) {
//         console.error('Error during text detection:', error);
//         throw new Error('Text detection failed');
//     }
// };

// const findClosestSize = async (extractedMeasurements) => {
//     const sizes = await getSizes(); // 사이즈 정보 가져오기

//     if (!sizes || sizes.length === 0) {
//         console.error('Sizes array is empty or undefined');
//         return null; 
//     }

//     let closestSize = null;
//     let minDifference = Infinity;

//     sizes.forEach(size => {
//         let difference = 0;

//         // 각 측정값의 차이를 계산
//         difference += Math.abs(size.length - extractedMeasurements.length);
//         difference += Math.abs(size.shoulder - extractedMeasurements.shoulder);
//         difference += Math.abs(size.chest - extractedMeasurements.chest);
//         difference += size.armhole !== null ? Math.abs(size.armhole - extractedMeasurements.armhole) : 0;
//         difference += size.sleeve !== null ? Math.abs(size.sleeve - extractedMeasurements.sleeve) : 0;
//         difference += Math.abs(size.sleeve_length - extractedMeasurements.sleeve_length);
//         difference += size.hem !== null ? Math.abs(size.hem - extractedMeasurements.hem) : 0;

//         // 가장 작은 차이를 가진 사이즈 찾기
//         if (difference < minDifference) {
//             minDifference = difference;
//             closestSize = size;
//         }
//     });

//     return closestSize;
// };

// // 사용자가 올린 이미지에서 텍스트를 추출하고, 가장 가까운 사이즈를 찾는 메소드
// const uploadAndDetect = async (imagePath) => {
//     try {
//         const detectedText = await detectText(imagePath); // 텍스트 감지
//         const extractedMeasurements = extractMeasurements(detectedText); // 측정값 추출
//         const closestSize = await findClosestSize(extractedMeasurements); // 가장 가까운 사이즈 찾기

//         // 결과 포맷팅
//         return {
//             isSuccess: true,
//             code: "200",
//             message: "텍스트 추출 및 사이즈 비교 성공",
//             result: closestSize ? {
//                 id: closestSize.id,
//                 cloth_id: closestSize.cloth_id,
//                 length: closestSize.length,
//                 shoulder: closestSize.shoulder,
//                 chest: closestSize.chest,
//                 armhole: closestSize.armhole,
//                 sleeve: closestSize.sleeve,
//                 sleeve_length: closestSize.sleeve_length,
//                 hem: closestSize.hem
//             } : null
//         };
//     } catch (error) {
//         console.error('Error in uploadAndDetect:', error);
//         return {
//             isSuccess: false,
//             code: "500",
//             message: "사이즈 비교 실패"
//         };
//     }
// };

// const extractMeasurements = (detectedDataString) => {
//     const measurements = {
//         length: 0,
//         shoulder: 0,
//         chest: 0,
//         armhole: null,
//         sleeve: null,
//         sleeve_length: 0,
//         hem: null,
//     };

//     // 문자열을 공백을 기준으로 나누어 배열로 변환
//     const detectedData = detectedDataString.split(/\s+/);
//     const values = detectedData.map(item => parseFloat(item)).filter(num => !isNaN(num));

//     // 매핑 순서에 따라 값을 할당
//     if (values.length >= 4) {
//         measurements.length = values[1]; // 총장 (2번째 값)
//         measurements.shoulder = values[3]; // 어깨너비 (4번째 값)
//         measurements.chest = values[5]; // 가슴단면 (6번째 값)
//         measurements.sleeve_length = values[values.length - 1]; // 마지막 값 (소매길이)
//     }

//     console.log('Extracted Measurements:', measurements); // 추출된 측정값 출력
//     return measurements;
// };

// // 예시 호출 (테스트용)
// const detectedDataString = "1 cm 총장 MY 1 78 2 어깨너비 3 가슴단면 가지고 계신 제품의 실측을 입력해 보세요. 4 소매길이 48 59 20.5 2 79 52 62 21.5 3 81 55 65 22.5";
// const measurements = extractMeasurements(detectedDataString);
// console.log(measurements); // 추출된 측정값 출력

// export default {
//     detectText,
//     findClosestSize,
//     extractMeasurements,
//     uploadAndDetect,
// };

// import vision from '@google-cloud/vision';
// import mysql from 'mysql2/promise'; 
// import dotenv from 'dotenv';
// import { getSizes } from './ocr.dao.js';

// dotenv.config();



// // 데이터베이스 연결
// const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
// });

// const detectText = async (imagePath) => {
//     try {
//         const [result] = await client.textDetection(imagePath);
//         const detections = result.textAnnotations;
//         console.log('Text Detection Result:', detections); // 감지된 텍스트 출력
//         return detections.length > 0 ? detections[0].description : "No text detected";
//     } catch (error) {
//         console.error('Error during text detection:', error);
//         throw new Error('Text detection failed');
//     }
// };

// const findClosestSize = async (extractedMeasurements) => {
//     const sizes = await getSizes(); // 사이즈 정보 가져오기

//     if (!sizes || sizes.length === 0) {
//         console.error('Sizes array is empty or undefined');
//         return null; 
//     }

//     let closestSize = null;
//     let minDifference = Infinity;

//     sizes.forEach(size => {
//         let difference = 0;

//         // 각 측정값의 차이를 계산
//         difference += Math.abs(size.length - extractedMeasurements.length);
//         difference += Math.abs(size.shoulder - extractedMeasurements.shoulder);
//         difference += Math.abs(size.chest - extractedMeasurements.chest);
//         difference += size.armhole !== null ? Math.abs(size.armhole - extractedMeasurements.armhole) : 0;
//         difference += size.sleeve !== null ? Math.abs(size.sleeve - extractedMeasurements.sleeve) : 0;
//         difference += Math.abs(size.sleeve_length - extractedMeasurements.sleeve_length);
//         difference += size.hem !== null ? Math.abs(size.hem - extractedMeasurements.hem) : 0;

//         // 가장 작은 차이를 가진 사이즈 찾기
//         if (difference < minDifference) {
//             minDifference = difference;
//             closestSize = size;
//         }
//     });

//     return closestSize;
// };

// // 사용자가 올린 이미지에서 텍스트를 추출하고, 가장 가까운 사이즈를 찾는 메소드
// const uploadAndDetect = async (imagePath) => {
//     try {
//         const detectedText = await detectText(imagePath); // 텍스트 감지
//         const extractedMeasurements = extractMeasurements(detectedText); // 측정값 추출
//         const closestSize = await findClosestSize(extractedMeasurements); // 가장 가까운 사이즈 찾기

//         // 결과 포맷팅
//         return {
//             isSuccess: true,
//             code: "200",
//             message: "텍스트 추출 및 사이즈 비교 성공",
//             result: closestSize ? {
//                 id: closestSize.id,
//                 cloth_id: closestSize.cloth_id,
//                 length: closestSize.length,
//                 shoulder: closestSize.shoulder,
//                 chest: closestSize.chest,
//                 armhole: closestSize.armhole,
//                 sleeve: closestSize.sleeve,
//                 sleeve_length: closestSize.sleeve_length,
//                 hem: closestSize.hem
//             } : null
//         };
//     } catch (error) {
//         console.error('Error in uploadAndDetect:', error);
//         return {
//             isSuccess: false,
//             code: "500",
//             message: "사이즈 비교 실패"
//         };
//     }
// };

// const extractMeasurements = (detectedDataString) => {
//     const measurements = {
//         length: 0,
//         shoulder: 0,
//         chest: 0,
//         armhole: null,
//         sleeve: null,
//         sleeve_length: 0,
//         hem: null,
//     };

//     // 문자열을 공백을 기준으로 나누어 배열로 변환
//     const detectedData = detectedDataString.split(/\s+/);
//     const values = detectedData.map(item => parseFloat(item)).filter(num => !isNaN(num));

//     // 매핑 순서에 따라 값을 할당
//     if (values.length >= 4) {
//         measurements.length = values[1]; // 총장 (2번째 값)
//         measurements.shoulder = values[3]; // 어깨너비 (4번째 값)
//         measurements.chest = values[5]; // 가슴단면 (6번째 값)
//         measurements.sleeve_length = values[values.length - 1]; // 마지막 값 (소매길이)
//     }

//     console.log('Extracted Measurements:', measurements); // 추출된 측정값 출력
//     return measurements;
// };

// // 예시 호출 (테스트용)
// const detectedDataString = "1 cm 총장 MY 1 78 2 어깨너비 3 가슴단면 가지고 계신 제품의 실측을 입력해 보세요. 4 소매길이 48 59 20.5 2 79 52 62 21.5 3 81 55 65 22.5";
// const measurements = extractMeasurements(detectedDataString);
// console.log(measurements); // 추출된 측정값 출력

// export default {
//     detectText,
//     findClosestSize,
//     extractMeasurements,
//     uploadAndDetect,
// };

// import vision from '@google-cloud/vision';
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import { getSizes } from './ocr.dao.js';

// dotenv.config();



// // 데이터베이스 연결
// const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
// });

// const detectText = async (imagePath) => {
//     try {
//         const [result] = await client.textDetection(imagePath);
//         const detections = result.textAnnotations;
//         console.log('Text Detection Result:', detections);
//         return detections.length > 0 ? detections[0].description : "No text detected";
//     } catch (error) {
//         console.error('Error during text detection:', error);
//         throw new Error('Text detection failed');
//     }
// };

// const extractMeasurements = (detectedDataString) => {
//     const measurements = {
//         length: null,
//         shoulder: null,
//         chest: null,
//         armhole: null,
//         sleeve: null,
//         sleeve_length: null,
//         hem: null,
//     };

//     // OCR로 감지된 텍스트를 공백으로 나누어 배열로 변환
//     const detectedData = detectedDataString.split(/\s+/);
//     const values = detectedData.map(item => parseFloat(item)).filter(num => !isNaN(num));

//     // 매핑 순서에 따라 값을 할당
//     if (values.length >= 4) {
//         measurements.length = values[1]; // 총장
//         measurements.shoulder = values[3]; // 어깨너비
//         measurements.chest = values[5]; // 가슴단면
//         measurements.sleeve_length = values[values.length - 1]; // 소매길이
//     }

//     console.log('Extracted Measurements:', measurements);
//     return measurements;
// };

// const findClosestSize = async (extractedMeasurements) => {
//     const sizes = await getSizes(); // 사이즈 정보 가져오기

//     if (!sizes || sizes.length === 0) {
//         console.error('Sizes array is empty or undefined');
//         return null; 
//     }

//     const closestSize = {
//         length: null,
//         shoulder: null,
//         chest: null,
//         armhole: null,
//         sleeve: null,
//         sleeve_length: null,
//         hem: null
//     };

//     Object.keys(extractedMeasurements).forEach(measurementKey => {
//         let minDifference = Infinity;
//         let closestValue = null;

//         sizes.forEach(size => {
//             if (size[measurementKey] !== null && extractedMeasurements[measurementKey] !== null) {
//                 const difference = Math.abs(size[measurementKey] - extractedMeasurements[measurementKey]);

//                 if (difference < minDifference) {
//                     minDifference = difference;
//                     closestValue = size[measurementKey];
//                 }
//             }
//         });

//         closestSize[measurementKey] = closestValue;
//     });

//     return closestSize;
// };

// const uploadAndDetect = async (imagePath) => {
//     try {
//         const detectedText = await detectText(imagePath); // 텍스트 감지
//         const extractedMeasurements = extractMeasurements(detectedText); // 측정값 추출
//         const closestSize = await findClosestSize(extractedMeasurements); // 가장 가까운 사이즈 찾기

//         return {
//             isSuccess: true,
//             code: "200",
//             message: "텍스트 추출 및 사이즈 비교 성공",
//             result: closestSize ? {
//                 length: closestSize.length,
//                 shoulder: closestSize.shoulder,
//                 chest: closestSize.chest,
//                 armhole: closestSize.armhole,
//                 sleeve: closestSize.sleeve,
//                 sleeve_length: closestSize.sleeve_length,
//                 hem: closestSize.hem
//             } : null
//         };
//     } catch (error) {
//         console.error('Error in uploadAndDetect:', error);
//         return {
//             isSuccess: false,
//             code: "500",
//             message: "사이즈 비교 실패"
//         };
//     }
// };

// // 예시 호출 (테스트용)
// const detectedDataString = "1 cm 총장 MY 1 78 2 어깨너비 3 가슴단면 가지고 계신 제품의 실측을 입력해 보세요. 4 소매길이 48 59 20.5 2 79 52 62 21.5 3 81 55 65 22.5";
// const measurements = extractMeasurements(detectedDataString);
// console.log(measurements); // 추출된 측정값 출력

// export default {
//     detectText,
//     findClosestSize,
//     extractMeasurements,
//     uploadAndDetect,
// };

// import vision from '@google-cloud/vision';
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import { getSizes } from './ocr.dao.js';

// dotenv.config();



// // 데이터베이스 연결
// const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
// });

// const detectText = async (imagePath) => {
//     try {
//         const [result] = await client.textDetection(imagePath);
//         const detections = result.textAnnotations;
//         console.log('Text Detection Result:', detections);
//         return detections.length > 0 ? detections[0].description : "No text detected";
//     } catch (error) {
//         console.error('Error during text detection:', error);
//         throw new Error('Text detection failed');
//     }
// };

// const extractMeasurements = (detectedDataString) => {
//     const measurements = {
//         length: null, // 총장
//         shoulder: null, // 어깨너비
//         chest: null, // 가슴단면
//         sleeve: null, // 소매너비
//         sleeve_length: null, // 소매길이
//         hem: null, // 밑단
//     };

//     const lines = detectedDataString.split(/\n/);

//     lines.forEach(line => {
//         const words = line.split(/\s+/);
//         const numbers = words.filter(word => !isNaN(parseFloat(word))).map(Number);

//         if (line.includes('총장')) {
//             measurements.length = numbers[0];
//         } else if (line.includes('어깨너비')) {
//             measurements.shoulder = numbers[0];
//         } else if (line.includes('가슴단면')) {
//             measurements.chest = numbers[0];
//         } else if (line.includes('소매너비')) {
//             measurements.sleeve = numbers[0];
//         } else if (line.includes('소매길이')) {
//             measurements.sleeve_length = numbers[0];
//         } else if (line.includes('밑단')) {
//             measurements.hem = numbers[0];
//         }
//     });

//     console.log('Extracted Measurements:', measurements);
//     return measurements;
// };

// const findClosestSize = async (extractedMeasurements) => {
//     const sizes = await getSizes(); // 사이즈 정보 가져오기

//     if (!sizes || sizes.length === 0) {
//         console.error('Sizes array is empty or undefined');
//         return null; 
//     }

//     const closestSize = {
//         length: null,
//         shoulder: null,
//         chest: null,
//         sleeve: null,
//         sleeve_length: null,
//         hem: null
//     };

//     Object.keys(extractedMeasurements).forEach(measurementKey => {
//         let minDifference = Infinity;
//         let closestValue = null;

//         sizes.forEach(size => {
//             if (size[measurementKey] !== null && extractedMeasurements[measurementKey] !== null) {
//                 const difference = Math.abs(size[measurementKey] - extractedMeasurements[measurementKey]);

//                 if (difference < minDifference) {
//                     minDifference = difference;
//                     closestValue = size[measurementKey];
//                 }
//             }
//         });

//         closestSize[measurementKey] = closestValue;
//     });

//     return closestSize;
// };

// const uploadAndDetect = async (imagePath) => {
//     try {
//         const detectedText = await detectText(imagePath); // 텍스트 감지
//         const extractedMeasurements = extractMeasurements(detectedText); // 측정값 추출
//         const closestSize = await findClosestSize(extractedMeasurements); // 가장 가까운 사이즈 찾기

//         return {
//             isSuccess: true,
//             code: "200",
//             message: "텍스트 추출 및 사이즈 비교 성공",
//             result: closestSize ? {
//                 length: closestSize.length,
//                 shoulder: closestSize.shoulder,
//                 chest: closestSize.chest,
//                 sleeve: closestSize.sleeve,
//                 sleeve_length: closestSize.sleeve_length,
//                 hem: closestSize.hem
//             } : null
//         };
//     } catch (error) {
//         console.error('Error in uploadAndDetect:', error);
//         return {
//             isSuccess: false,
//             code: "500",
//             message: "사이즈 비교 실패"
//         };
//     }
// };

// // 예시 호출 (테스트용)
// const detectedDataString = "1 cm 총장 MY 1 78 2 어깨너비 3 가슴단면 가지고 계신 제품의 실측을 입력해 보세요. 4 소매길이 48 59 20.5 2 79 52 62 21.5 3 81 55 65 22.5";
// const measurements = extractMeasurements(detectedDataString);
// console.log(measurements); // 추출된 측정값 출력

// export default {
//     detectText,
//     findClosestSize,
//     extractMeasurements,
//     uploadAndDetect,
// };
// import vision from '@google-cloud/vision';
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import { getSizes } from './ocr.dao.js';

// dotenv.config();



// // 데이터베이스 연결
// const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
// });

// const detectText = async (imagePath) => {
//     try {
//         const [result] = await client.textDetection(imagePath);
//         const detections = result.textAnnotations;
//         console.log('Text Detection Result:', detections);
//         return detections.length > 0 ? detections[0].description : "No text detected";
//     } catch (error) {
//         console.error('Error during text detection:', error);
//         throw new Error('Text detection failed');
//     }
// };

// const extractMeasurements = (detectedDataString) => {
//     const measurements = {
//         length: null, // 총장
//         shoulder: null, // 어깨너비
//         chest: null, // 가슴단면
//         sleeve_length: null, // 소매길이
//     };

//     const lines = detectedDataString.split(/\n/);

//     lines.forEach(line => {
//         const words = line.split(/\s+/);
//         const numbers = words.filter(word => !isNaN(parseFloat(word))).map(Number);

//         if (line.includes('총장')) {
//             measurements.length = numbers[0];
//         } else if (line.includes('어깨너비')) {
//             measurements.shoulder = numbers[0];
//         } else if (line.includes('가슴단면')) {
//             measurements.chest = numbers[0];
//         } else if (line.includes('소매길이')) {
//             measurements.sleeve_length = numbers[0];
//         }
//     });

//     console.log('Extracted Measurements:', measurements);
//     return measurements;
// };

// const findClosestSize = async (extractedMeasurements) => {
//     const sizes = await getSizes(); // 사이즈 정보 가져오기

//     if (!sizes || sizes.length === 0) {
//         console.error('Sizes array is empty or undefined');
//         return null; 
//     }

//     let closestSize = null;
//     let minTotalDifference = Infinity;

//     sizes.forEach(size => {
//         let totalDifference = 0;

//         Object.keys(extractedMeasurements).forEach(measurementKey => {
//             if (extractedMeasurements[measurementKey] !== null && size[measurementKey] !== null) {
//                 const difference = Math.abs(size[measurementKey] - extractedMeasurements[measurementKey]);
//                 totalDifference += difference;
//             }
//         });

//         if (totalDifference < minTotalDifference) {
//             minTotalDifference = totalDifference;
//             closestSize = size;
//         }
//     });

//     return closestSize;
// };

// const uploadAndDetect = async (imagePath) => {
//     try {
//         const detectedText = await detectText(imagePath); // 텍스트 감지
//         const extractedMeasurements = extractMeasurements(detectedText); // 측정값 추출
//         const closestSize = await findClosestSize(extractedMeasurements); // 가장 가까운 사이즈 찾기

//         return {
//             isSuccess: true,
//             code: "200",
//             message: "텍스트 추출 및 사이즈 비교 성공",
//             result: closestSize || null,
//         };
//     } catch (error) {
//         console.error('Error in uploadAndDetect:', error);
//         return {
//             isSuccess: false,
//             code: "500",
//             message: "사이즈 비교 실패"
//         };
//     }
// };

// // 이미지 경로에 따라 호출 (테스트용)
// const imagePath = '/mnt/data/무신사상의.png';
// uploadAndDetect(imagePath).then(result => {
//     console.log(result); // 추출된 측정값 및 비교 결과 출력
// }).catch(error => {
//     console.error('Error:', error);
// });

// export default {
//     detectText,
//     findClosestSize,
//     extractMeasurements,
//     uploadAndDetect,
// };
import vision from '@google-cloud/vision';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { getSizes } from './ocr.dao.js';

dotenv.config();

// 데이터베이스 연결
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});

// const detectText = async (imagePath) => {
//     try {
//         const [result] = await client.textDetection(imagePath);
//         const detections = result.textAnnotations;
//         console.log('Text Detection Result:', detections);
//         return detections.length > 0 ? detections[0].description : "No text detected";
//     } catch (error) {
//         console.error('Error during text detection:', error);
//         throw new Error('Text detection failed');
//     }
// };
const detectText = async (imagePath) => {
    try {
        const [result] = await client.textDetection(imagePath);
        const detections = result.textAnnotations;
        console.log('Text Detection Result:', detections);
        return detections.length > 0 ? detections[0].description : "No text detected";
    } catch (error) {
        console.error('Error during text detection:', error);
        throw new Error('Text detection failed');
    }
};

// const extractMeasurements = (detectedDataString) => {
//     const measurements = {
//         length: null, // 총장
//         shoulder: null, // 어깨너비
//         chest: null, // 가슴단면
//         sleeve_length: null, // 소매길이
//     };

//     const lines = detectedDataString.split(/\n/);

//     lines.forEach(line => {
//         const words = line.split(/\s+/);
//         const numbers = words.filter(word => !isNaN(parseFloat(word))).map(Number);

//         if (line.includes('총장')) {
//             measurements.length = numbers[0];
//         } else if (line.includes('어깨너비')) {
//             measurements.shoulder = numbers[0];
//         } else if (line.includes('가슴단면')) {
//             measurements.chest = numbers[0];
//         } else if (line.includes('소매길이')) {
//             measurements.sleeve_length = numbers[0];
//         }
//     });

//     console.log('Extracted Measurements:', measurements);
//     return measurements;
// };
// const extractMeasurements = (detectedDataString) => {
//     const measurements = {
//         length: null, // 총장
//         shoulder: null, // 어깨너비
//         chest: null, // 가슴단면
//         sleeve_length: null, // 소매길이
//     };

//     // 텍스트를 줄바꿈 기준으로 분리
//     const lines = detectedDataString.split(/\n/);

//     lines.forEach(line => {
//         // 각 라인을 공백으로 분리
//         const words = line.split(/\s+/);
//         // 숫자 필터링
//         const numbers = words.filter(word => !isNaN(parseFloat(word))).map(Number);

//         // 측정값에 따라 적절한 처리
//         if (line.includes('총장')) {
//             measurements.length = numbers[0] || measurements.length;
//         } else if (line.includes('어깨') && line.includes('너비')) {
//             measurements.shoulder = numbers[0] || measurements.shoulder;
//         } else if (line.includes('가슴') && line.includes('단면')) {
//             measurements.chest = numbers[0] || measurements.chest;
//         } else if (line.includes('소매') && line.includes('길이')) {
//             measurements.sleeve_length = numbers[0] || measurements.sleeve_length;
//         }
//     });

//     console.log('Extracted Measurements:', measurements);
//     return measurements;
// };
const extractMeasurements = (detectedDataString) => {
    let formattedOutput = `
cm                1 총장           2 어깨너비        3 가슴단면  4 소매길이
MY                가지고 계신 제품의 실측을 입력해보세요.
`;

    const lines = detectedDataString.split(/\n/);
    const measurements = [];

    lines.forEach(line => {
        const words = line.trim().split(/\s+/);
        const numbers = words.filter(word => !isNaN(parseFloat(word))).map(Number);
        
        if (numbers.length > 0) {
            measurements.push(numbers);
        }
    });

    // 개별 측정값을 정리하여 출력
    for (let i = 0; i < measurements.length; i++) {
        const row = measurements[i]; // 각 행의 측정값
        const rowOutput = `${i + 1}                     ${row[0]}                ${row[1]}                ${row[2]}             ${row[3] || ''}\n`;
        formattedOutput += rowOutput;
    }

    console.log('Formatted Output:\n', formattedOutput);
    return formattedOutput;
};


const findClosestSize = async (extractedMeasurements) => {
    const sizes = await getSizes(); // 사이즈 정보 가져오기

    if (!sizes || sizes.length === 0) {
        console.error('Sizes array is empty or undefined');
        return null; 
    }

    let closestSize = null;
    let minTotalDifference = Infinity;

    sizes.forEach(size => {
        let totalDifference = 0;
        let validComparison = false;

        Object.keys(extractedMeasurements).forEach(measurementKey => {
            if (extractedMeasurements[measurementKey] !== null && size[measurementKey] !== null) {
                const difference = Math.abs(size[measurementKey] - extractedMeasurements[measurementKey]);
                totalDifference += difference;
                validComparison = true;
            }
        });

        if (validComparison && totalDifference < minTotalDifference) {
            minTotalDifference = totalDifference;
            closestSize = size;
        }
    });

    console.log('Closest Size Found:', closestSize);
    console.log('Minimum Total Difference:', minTotalDifference);

    return closestSize;
};

const uploadAndDetect = async (imagePath) => {
    try {
        const detectedText = await detectText(imagePath); // 텍스트 감지
        const extractedMeasurements = extractMeasurements(detectedText); // 측정값 추출

        if (Object.values(extractedMeasurements).every(value => value === null)) {
            return {
                isSuccess: false,
                code: "404",
                message: "측정값을 추출할 수 없습니다.",
                result: null
            };
        }

        const closestSize = await findClosestSize(extractedMeasurements); // 가장 가까운 사이즈 찾기

        if (!closestSize) {
            return {
                isSuccess: false,
                code: "404",
                message: "가까운 사이즈를 찾을 수 없습니다.",
                result: null
            };
        }

        return {
            isSuccess: true,
            code: "200",
            message: "텍스트 추출 및 사이즈 비교 성공",
            result: closestSize
        };
    } catch (error) {
        console.error('Error in uploadAndDetect:', error);
        return {
            isSuccess: false,
            code: "500",
            message: "사이즈 비교 실패",
            error: error.message
        };
    }
};

// 이미지 경로에 따라 호출 (테스트용)
const imagePath = '/mnt/data/무신사상의.png';
uploadAndDetect(imagePath).then(result => {
    console.log(result); // 추출된 측정값 및 비교 결과 출력
}).catch(error => {
    console.error('Error:', error);
});

export default {
    detectText,
    findClosestSize,
    extractMeasurements,
    uploadAndDetect,
};
