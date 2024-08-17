// import vision from '@google-cloud/vision';
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import { getSizes } from './ocr.dao.js';

// dotenv.config();

// const client = new vision.ImageAnnotatorClient({
//     keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
// });

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
//     let formattedOutput = `
// cm                1 총장           2 어깨너비        3 가슴단면  4 소매길이
// MY                가지고 계신 제품의 실측을 입력해보세요.
// `;

//     const lines = detectedDataString.split(/\n/);
//     const measurements = [];

//     lines.forEach(line => {
//         const words = line.trim().split(/\s+/);
//         const numbers = words.filter(word => !isNaN(parseFloat(word))).map(Number);
        
//         if (numbers.length > 0) {
//             measurements.push(numbers);
//         }
//     });

//     // 개별 측정값을 정리하여 출력
//     for (let i = 0; i < measurements.length; i++) {
//         const row = measurements[i]; // 각 행의 측정값
//         const rowOutput = `${i + 1}                     ${row[0]}                ${row[1]}                ${row[2]}             ${row[3] || ''}\n`;
//         formattedOutput += rowOutput;
//     }

//     console.log('Formatted Output:\n', formattedOutput);
//     return formattedOutput;
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
//         let validComparison = false;

//         Object.keys(extractedMeasurements).forEach(measurementKey => {
//             if (extractedMeasurements[measurementKey] !== null && size[measurementKey] !== null) {
//                 const difference = Math.abs(size[measurementKey] - extractedMeasurements[measurementKey]);
//                 totalDifference += difference;
//                 validComparison = true;
//             }
//         });

//         if (validComparison && totalDifference < minTotalDifference) {
//             minTotalDifference = totalDifference;
//             closestSize = size;
//         }
//     });

//     console.log('Closest Size Found:', closestSize);
//     console.log('Minimum Total Difference:', minTotalDifference);

//     return closestSize;
// };

// const uploadAndDetect = async (imagePath) => {
//     try {
//         const detectedText = await detectText(imagePath); // 텍스트 감지
//         const extractedMeasurements = extractMeasurements(detectedText); // 측정값 추출

//         if (Object.values(extractedMeasurements).every(value => value === null)) {
//             return {
//                 isSuccess: false,
//                 code: "404",
//                 message: "측정값을 추출할 수 없습니다.",
//                 result: null
//             };
//         }

//         const closestSize = await findClosestSize(extractedMeasurements); // 가장 가까운 사이즈 찾기

//         if (!closestSize) {
//             return {
//                 isSuccess: false,
//                 code: "404",
//                 message: "가까운 사이즈를 찾을 수 없습니다.",
//                 result: null
//             };
//         }

//         return {
//             isSuccess: true,
//             code: "200",
//             message: "텍스트 추출 및 사이즈 비교 성공",
//             result: closestSize
//         };
//     } catch (error) {
//         console.error('Error in uploadAndDetect:', error);
//         return {
//             isSuccess: false,
//             code: "500",
//             message: "사이즈 비교 실패",
//             error: error.message
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

// src/services/ocr.service.js
// import { getRealSize } from '../daos/ocr.dao';
// import { SizeResultDto } from '../dtos/ocr.dto';
// import vision from '@google-cloud/vision';

// const client = new vision.ImageAnnotatorClient();

// export const extractTextFromImage = async (imagePath) => {
//     const [result] = await client.textDetection(imagePath);
//     const detections = result.textAnnotations;
//     return detections[0]?.description.split('\n').map(line => line.trim()).filter(Boolean);
// };

// export const compareSizes = async (clothId, uploadedSizes) => {
//     const realSizeData = await getRealSize(clothId);
//     const results = new SizeResultDto();

//     const sizeKeys = ['length', 'shoulder', 'chest', 'armhole', 'sleeve', 'sleeve_length', 'hem'];
    
//     sizeKeys.forEach(key => {
//         const dbValue = realSizeData[key];
//         if (dbValue !== null) {
//             const closestValue = uploadedSizes.reduce((prev, curr) => {
//                 return (Math.abs(curr - dbValue) < Math.abs(prev - dbValue) ? curr : prev);
//             });
//             results[key] = closestValue;
//         } else {
//             results[key] = null; // DB 값이 NULL인 경우
//         }
//     });

//     return results;
// };

// import * as ocrDao from './ocr.dao.js';
// import { getTextFromImage } from './ocr.utils.js';


// export const compareSize = async (imageId) => {
//   try {
//     // 이전에 저장된 옷 사이즈 정보 가져오기
//     const savedSize = await ocrDao.getSavedSize();

//     // 새로 업로드된 사이즈 이미지에서 텍스트 추출
//     const uploadedSize = await getTextFromImage(imageId);

//     // 저장된 사이즈와 업로드된 사이즈 비교
//     const result = compareAndGetClosestSize(savedSize, uploadedSize);

//     return {
//       isSuccess: true,
//       code: '200',
//       message: '텍스트 추출 및 사이즈 비교 성공',
//       result,
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// const compareAndGetClosestSize = (savedSize, uploadedSize) => {
//   // 각 사이즈 항목별로 가장 유사한 값 찾기
//   const { length, shoulder, chest, armhole, sleeve, sleeveLength, hem } = uploadedSize;
//   return {
//     length: getClosestValue(savedSize.length, length),
//     shoulder: getClosestValue(savedSize.shoulder, shoulder),
//     chest: getClosestValue(savedSize.chest, chest),
//     armhole: savedSize.armhole || null,
//     sleeve: savedSize.sleeve || null,
//     sleeveLength: getClosestValue(savedSize.sleeveLength, sleeveLength),
//     hem: savedSize.hem || null,
//   };
// };

// const getClosestValue = (savedValue, uploadedValue) => {
//   // 저장된 값과 업로드된 값의 차이가 가장 작은 값 반환
//   return savedValue || uploadedValue;
// };

// import vision from '@google-cloud/vision';
// import ocrDao from './ocr.dao.js';

// const client = new vision.ImageAnnotatorClient();

// const compareSizes = async (imageId, userId) => {
//     try {
//         // DB에서 유저의 사이즈 데이터를 가져옴
//         const realSize = await ocrDao.getRealSize(userId);

//         // 이미지 경로 가져오기
//         const imagePath = await ocrDao.getImagePath(imageId);

//         // 이미지에서 텍스트 추출
//         const [result] = await client.textDetection(imagePath);
//         const detections = result.textAnnotations;
        
//         // 추출된 텍스트를 배열로 변환 (첫 번째 요소는 전체 텍스트, 나머지는 개별 단어들)
//         const extractedText = detections.slice(1).map((text) => text.description);

//         // 사이즈 매칭 로직
//         const matchedSizes = {
//             length: matchClosestSize(realSize.length, extractedText, '총장'),
//             shoulder: matchClosestSize(realSize.shoulder, extractedText, '어깨너비'),
//             chest: matchClosestSize(realSize.chest, extractedText, '가슴단면'),
//             armhole: matchClosestSize(realSize.armhole, extractedText, '암홀단면'),
//             sleeve: matchClosestSize(realSize.sleeve, extractedText, '소매단면'),
//             sleeve_length: matchClosestSize(realSize.sleeve_length, extractedText, '소매길이'),
//             hem: matchClosestSize(realSize.hem, extractedText, '밑단단면'),
//         };

//         return matchedSizes;
//     } catch (error) {
//         throw new Error('사이즈 비교 중 오류 발생: ' + error.message);
//     }
// };

// // 추출된 텍스트와 DB 사이즈를 비교하여 가장 근접한 값을 반환하는 함수
// const matchClosestSize = (dbSize, extractedText, label) => {
//     if (!dbSize) return null;

//     const sizeRegex = new RegExp(`${label}\\s*(\\d+(?:\\.\\d+)?)`);  // 라벨과 숫자(소수점 가능) 추출
//     let closestValue = null;
//     let smallestDiff = Infinity;

//     for (let i = 0; i < extractedText.length; i++) {
//         const match = extractedText[i].match(sizeRegex);
//         if (match) {
//             const sizeValue = parseFloat(match[1]);
//             const diff = Math.abs(sizeValue - dbSize);
//             if (diff < smallestDiff) {
//                 smallestDiff = diff;
//                 closestValue = sizeValue;
//             }
//         }
//     }

//     return closestValue;
// };

// export default {
//     compareSizes,
// };

import vision from '@google-cloud/vision';
import ocrDao from './ocr.dao.js';
import { parseProductSizeData, getTextFromImage } from './ocr.utils.js';

// const client = new vision.ImageAnnotatorClient();
const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS // 환경 변수에서 파일 경로 가져오기
});

const compareSizes = async (imageId, userId) => {
    console.log('compareSizes called with:', { imageId, userId });

    try {
        // 1. DB에서 유저의 사이즈 데이터를 가져옴
        const realSize = await ocrDao.getRealSize(userId);
        console.log('realSize:', realSize);


        // 2. 이미지 경로 가져오기
        const imagePath = await ocrDao.getImagePath(imageId);
        console.log('imagePath:', imagePath);

        // 3. 이미지에서 텍스트 추출
        const extractedSizeData = await getTextFromImage(imagePath);
        console.log('extractedSizeData:', extractedSizeData);

        // 4. 사이즈 매칭 로직
        const matchedSizes = {
            length: matchClosestSize(realSize.length, extractedSizeData.length, '총장'),
            shoulder: matchClosestSize(realSize.shoulder, extractedSizeData.shoulder, '어깨너비'),
            chest: matchClosestSize(realSize.chest, extractedSizeData.chest, '가슴단면'),
            armhole: matchClosestSize(realSize.armhole, extractedSizeData.armhole, '암홀단면'),
            sleeve: matchClosestSize(realSize.sleeve, extractedSizeData.sleeve, '소매단면'),
            sleeve_length: matchClosestSize(realSize.sleeve_length, extractedSizeData.sleeveLength, '소매길이'),
            hem: matchClosestSize(realSize.hem, extractedSizeData.hem, '밑단단면'),
        };
        console.log('matchedSizes:', matchedSizes);
        return matchedSizes;
    } catch (error) {
        throw new Error('사이즈 비교 중 오류 발생: ' + error.message);
    }
};

// 추출된 텍스트와 DB 사이즈를 비교하여 가장 근접한 값을 반환하는 함수
// const matchClosestSize = (dbSize, extractedSize, label) => {
//     if (!dbSize) return null;
//     if (!extractedSize) return null;

//     const diff = Math.abs(extractedSize - dbSize);
//     return diff < 5 ? extractedSize : null; // 5 단위 이내 차이만 인정
// };
const matchClosestSize = (dbSizes, extractedSizes, label) => {
    if (!dbSizes || !extractedSizes) return null;

    const results = {};

    for (const sizeType in extractedSizes) {
        if (extractedSizes.hasOwnProperty(sizeType)) {
            const extractedSize = extractedSizes[sizeType];
            const dbSizeValues = dbSizes[sizeType];

            if (dbSizeValues && extractedSize) {
                let closestDiff = Infinity;
                let closestSize = null;

                for (const dbSize of dbSizeValues) {
                    const diff = Math.abs(extractedSize - dbSize);
                    if (diff < closestDiff) {
                        closestDiff = diff;
                        closestSize = dbSize;
                    }
                }

                results[sizeType] = closestSize;
            } else {
                results[sizeType] = null;
            }
        }
    }

    return results;
};

export default {
    compareSizes,
};
