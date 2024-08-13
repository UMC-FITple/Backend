import vision from '@google-cloud/vision';
import mysql from 'mysql2/promise'; 
import dotenv from 'dotenv';
import { getSizes } from './ocr.dao.js';

dotenv.config();
// const { getSizes } = require('./ocr.dao'); // DAO 모듈 가져오기


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
        console.log('Text Detection Result:', detections); // 감지된 텍스트 출력
        return detections.length > 0 ? detections[0].description : "No text detected";
    } catch (error) {
        console.error('Error during text detection:', error);
        throw new Error('Text detection failed');
    }
};


// const findClosestSize = async (measuredValues) => {
//     const [rows] = await connection.execute('SELECT * FROM real_size');
    
//     const threshold = 2; // 허용 오차 범위 (예: 2cm)
//     let closestMatch = null;
//     let smallestDifference = Infinity;

//     rows.forEach(size => {
//         const differences = Object.keys(measuredValues).map(key => {
//             return Math.abs(size[key] - measuredValues[key]);
//         });
//         const totalDifference = differences.reduce((acc, diff) => acc + diff, 0);

//         if (totalDifference < smallestDifference) {
//             smallestDifference = totalDifference;
//             closestMatch = size;
//         }
//     });
//     console.log('Closest Match Found:', closestMatch); // 가장 가까운 사이즈 출력
//     return closestMatch && smallestDifference <= threshold ? closestMatch : null;
// };

// const extractMeasurements = (text) => {
//     const measurements = {
//         length: 0,
//         shoulder: 0,
//         chest: 0,
//         armhole: 0,
//         sleeve: 0,
//         sleeve_length: 0,
//         hem: 0,
//     };

//     const mapping = {
//         '총장': 'length',
//         '어깨너비': 'shoulder',
//         '가슴단면': 'chest',
//         '암홀단면': 'armhole',
//         '소매단면': 'sleeve',
//         '소매길이': 'sleeve_length',
//         '밑단단면': 'hem',
//         'length': 'length',
//         'shoulder': 'shoulder',
//         'chest': 'chest',
//         'armhole': 'armhole',
//         'sleeve': 'sleeve',
//         'sleeve_length': 'sleeve_length',
//         'hem': 'hem',
//     };

//     const regex = /(\w+):\s*([\d.]+)/g;
//     let match;
//     while ((match = regex.exec(text)) !== null) {
//         const key = mapping[match[1]];
//         const value = parseFloat(match[2]);
//         if (key && measurements[key] !== undefined) {
//             measurements[key] = value;
//         }
//     }
//     console.log('Extracted Measurements:', measurements); // 추출된 측정값 출력
//     return measurements;
// };

//성공2번째
// const extractMeasurements = (detectedData) => {
//     const measurements = {
//         length: 0,
//         shoulder: 0,
//         chest: 0,
//         armhole: 0,
//         sleeve: 0,
//         sleeve_length: 0,
//         hem: 0,
//     };

//     // detectedData가 배열인지 확인
//     if (Array.isArray(detectedData)) {
//         // 감지된 데이터에서 description을 추출하여 배열로 변환
//         const values = detectedData.map(item => parseFloat(item.description)).filter(num => !isNaN(num));

//         // 매핑 순서에 따라 값을 할당
//         if (values.length >= 4) {
//             measurements.length = values[0]; // 총장
//             measurements.shoulder = values[1]; // 어깨너비
//             measurements.chest = values[2]; // 가슴단면
//             measurements.sleeve_length = values[3]; // 소매길이
//         }
//     } else {
//         console.error('detectedData는 배열이 아닙니다:', detectedData);
//     }

//     console.log('Extracted Measurements:', measurements); // 추출된 측정값 출력
//     return measurements;
// };
// function findClosestSize(extractedMeasurements, sizes) {
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
// }
const findClosestSize = async (extractedMeasurements) => {
    const sizes = await getSizes(); // 사이즈 정보 가져오기

    if (!sizes || sizes.length === 0) {
        console.error('Sizes array is empty or undefined');
        return null; // 혹은 적절한 기본값 반환
    }

    let closestSize = null;
    let minDifference = Infinity;

    sizes.forEach(size => {
        let difference = 0;

        // 각 측정값의 차이를 계산
        difference += Math.abs(size.length - extractedMeasurements.length);
        difference += Math.abs(size.shoulder - extractedMeasurements.shoulder);
        difference += Math.abs(size.chest - extractedMeasurements.chest);
        difference += size.armhole !== null ? Math.abs(size.armhole - extractedMeasurements.armhole) : 0;
        difference += size.sleeve !== null ? Math.abs(size.sleeve - extractedMeasurements.sleeve) : 0;
        difference += Math.abs(size.sleeve_length - extractedMeasurements.sleeve_length);
        difference += size.hem !== null ? Math.abs(size.hem - extractedMeasurements.hem) : 0;

        // 가장 작은 차이를 가진 사이즈 찾기
        if (difference < minDifference) {
            minDifference = difference;
            closestSize = size;
        }
    });

    return closestSize;
};


const extractMeasurements = (detectedDataString) => {
    const measurements = {
        length: 0,
        shoulder: 0,
        chest: 0,
        armhole: 0,
        sleeve: 0,
        sleeve_length: 0,
        hem: 0,
    };

    // 문자열을 줄바꿈이나 스페이스를 기준으로 나누어 배열로 변환
    const detectedData = detectedDataString.split(/\s+/);

    // 숫자 값만 필터링하여 배열로 변환
    const values = detectedData.map(item => parseFloat(item)).filter(num => !isNaN(num));

    // 매핑 순서에 따라 값을 할당
    if (values.length >= 4) {
        measurements.length = values[0]; // 총장
        measurements.shoulder = values[1]; // 어깨너비
        measurements.chest = values[2]; // 가슴단면
        measurements.sleeve_length = values[3]; // 소매길이
    }

    console.log('Extracted Measurements:', measurements); // 추출된 측정값 출력
    return measurements;
};

// 예시 호출
const detectedDataString = "1 cm 총장 MY 1 78 2 어깨너비 3 가슴단면 가지고 계신 제품의 실측을 입력해 보세요. 4 소매길이 48 59 20.5 2 79 52 62 21.5 3 81 55 65 22.5";
extractMeasurements(detectedDataString);



export default {
    detectText,
    findClosestSize,
    extractMeasurements,
};
