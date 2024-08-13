// import ocrService from './ocr.service.js';
// import asyncHandler from 'express-async-handler';

// class OcrController {
//     uploadAndDetect = asyncHandler(async (req, res) => {
//         const imagePath = req.body.imagePath; // 클라이언트로부터 경로를 받음
//         try {
//             const text = await ocrService.detectText(imagePath);

//             // 텍스트에서 수치값 추출
//             const measuredValues = ocrService.extractMeasurements(text);

//             // DB에서 가장 가까운 사이즈 찾기
//             const closestSize = await ocrService.findClosestSize(measuredValues);

//             res.json({
//                 isSuccess: true,
//                 code: "200",
//                 message: "텍스트 추출 및 사이즈 비교 성공",
//                 result: closestSize,
//             });
//         } catch (error) {
//             res.status(500).json({
//                 isSuccess: false,
//                 code: "500",
//                 message: error.message,
//             });
//         }
//     });
// }

// export default new OcrController();
// ocr.controller.js

import ocrService from './ocr.service.js';
import asyncHandler from 'express-async-handler';
import { response } from "../../../config/response.js";

// const uploadAndDetect = asyncHandler(async (req, res, imagePath) => {
//     try {
//         const text = await ocrService.detectText(imagePath);

//         // 텍스트에서 수치값 추출
//         const measuredValues = ocrService.extractMeasurements(text);

//         // DB에서 가장 가까운 사이즈 찾기
//         const closestSize = await ocrService.findClosestSize(measuredValues);

//         res.json(response({ isSuccess: true, code: "200", message: "텍스트 추출 및 사이즈 비교 성공" }, closestSize));
//     } catch (error) {
//         res.status(500).json(response({ isSuccess: false, code: "500", message: error.message }, null));
//     }
// });

const uploadAndDetect = asyncHandler(async (req, res, imagePath) => {
    try {
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

        res.json(response({ 
            isSuccess: true, 
            code: "200", 
            message: "텍스트 추출 및 사이즈 비교 성공" 
        }, closestSize));
    } catch (error) {
        res.status(500).json(response({ 
            isSuccess: false, 
            code: "500", 
            message: error.message 
        }, null));
    }
});

export default { uploadAndDetect };