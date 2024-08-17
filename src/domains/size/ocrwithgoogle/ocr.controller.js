// import ocrService from './ocr.service.js';
// import asyncHandler from 'express-async-handler';
// import { response } from "../../../config/response.js";

// const uploadAndDetect = asyncHandler(async (req, res) => {
//     try {
//         // 이미지 경로를 요청에서 가져옴
//         const imagePath = req.file.path; // 파일 업로드 처리 후 이미지 경로를 가져오는 방법

//         // 텍스트 감지
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

//         // 성공적인 응답 반환
//         res.json(response({ 
//             isSuccess: true, 
//             code: "200", 
//             message: "텍스트 추출 및 사이즈 비교 성공" 
//         }, closestSize));
//     } catch (error) {
//         console.error('Error in uploadAndDetect:', error); // 에러 로깅
//         res.status(500).json(response({ 
//             isSuccess: false, 
//             code: "500", 
//             message: error.message || "서버 오류" // 에러 메시지 기본값 추가
//         }, null));
//     }
// });

// export default { uploadAndDetect };
// src/controllers/ocr.controller.js




// import express from 'express';
// // import { extractTextFromImage, compareSizes } from './ocr.service.js';
// import {StatusCodes} from 'http-status-codes';
// import * as ocrService from './ocr.service.js';

// export const compareSize = async (req, res) => {
//   try {
//     const { imageId } = req.body;
//     const result = await ocrService.compareSize(imageId);
//     res.status(StatusCodes.OK).json(result);
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       isSuccess: false,
//       code: StatusCodes.INTERNAL_SERVER_ERROR,
//       message: error.message,
//     });
//   }
// };

// import express from 'express';
// import ocrService from './ocr.service.js';
// import { validationResult } from 'express-validator';

// const getComparisonResult = async (req, res) => {
//     try {
//         // `imageId`와 `userId`는 클라이언트 요청에 포함된다고 가정합니다.
//         const { imageId, userId } = req.query;

//         // 기본적인 입력 검증 (예: imageId와 userId가 있는지 확인)
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ isSuccess: false, code: 400, message: '잘못된 요청입니다.', errors: errors.array() });
//         }

//         // 서비스 레이어 호출하여 결과를 가져옴
//         const result = await ocrService.compareSizes(imageId, userId);

//         return res.status(200).json({ isSuccess: true, code: 200, message: '텍스트 추출 및 사이즈 비교 성공', result });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ isSuccess: false, code: 500, message: '서버 에러입니다.' });
//     }
// };

// export default {
//     getComparisonResult,
// };

import ocrService from './ocr.service.js';
import asyncHandler from 'express-async-handler';
import { response } from "../../../config/response.js";

export default {
    async getSizeMatchingResult(req, res) {
      try {
        const { imageId, userId } = req.query;
        console.log('imageId:', imageId);
        console.log('userId:', userId);
  
        // 1. 사이즈 비교 로직 실행
        const matchedSizes = await ocrService.compareSizes(imageId, userId);
        console.log('matchedSizes:', matchedSizes);
  
        // 2. 결과를 JSON 형태로 반환
        return res.status(200).json(
          response(
            {
              isSuccess: true,
              code: 200,
              message: 'Size matching result retrieved successfully',
            },
            matchedSizes
          )
        );
      } catch (error) {
        console.error('Error getting size matching result:', error);
        return res.status(500).json(
          response(
            {
              isSuccess: false,
              code: 500,
              message: 'Error getting size matching result',
            },
            { error: error.message }
          )
        );
      }
    },
  };
  