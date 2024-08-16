// import ocrService from './ocr.service.js';
// import asyncHandler from 'express-async-handler';
// import { response } from "../../../config/response.js";

// const uploadAndDetect = asyncHandler(async (req, res, imagePath) => {
//     try {
//         const text = await ocrService.detectText(imagePath);

//         // 텍스트에서 수치값 추출
//         const measuredValues = ocrService.extractMeasurements(text);

//         // DB에서 가장 가까운 사이즈 찾기
//         const closestSize = await ocrService.findClosestSize(measuredValues);

//         if (!closestSize) {
//             return res.json(response({ 
//                 isSuccess: false, 
//                 code: "404", 
//                 message: "가까운 사이즈를 찾을 수 없습니다." 
//             }, null));
//         }

//         res.json(response({ 
//             isSuccess: true, 
//             code: "200", 
//             message: "텍스트 추출 및 사이즈 비교 성공" 
//         }, closestSize));
//     } catch (error) {
//         res.status(500).json(response({ 
//             isSuccess: false, 
//             code: "500", 
//             message: error.message 
//         }, null));
//     }
// });

// export default { uploadAndDetect };

// 
import ocrService from './ocr.service.js';
import asyncHandler from 'express-async-handler';
import { response } from "../../../config/response.js";

const uploadAndDetect = asyncHandler(async (req, res) => {
    try {
        // 이미지 경로를 요청에서 가져옴
        const imagePath = req.file.path; // 파일 업로드 처리 후 이미지 경로를 가져오는 방법

        // 텍스트 감지
        const text = await ocrService.detectText(imagePath);
        
        // 텍스트에서 수치값 추출
        const measuredValues = ocrService.extractMeasurements(text);
        
        // DB에서 가장 가까운 사이즈 찾기
        const closestSize = await ocrService.findClosestSize(measuredValues);

        if (!closestSize) {
            return res.json(response({ 
                isSuccess: false, 
                code: "404", 
                message: "가까운 사이즈를 찾을 수 없습니다." 
            }, null));
        }

        // 성공적인 응답 반환
        res.json(response({ 
            isSuccess: true, 
            code: "200", 
            message: "텍스트 추출 및 사이즈 비교 성공" 
        }, closestSize));
    } catch (error) {
        console.error('Error in uploadAndDetect:', error); // 에러 로깅
        res.status(500).json(response({ 
            isSuccess: false, 
            code: "500", 
            message: error.message || "서버 오류" // 에러 메시지 기본값 추가
        }, null));
    }
});

export default { uploadAndDetect };
