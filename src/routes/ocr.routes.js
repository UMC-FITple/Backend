// import express from 'express';
// import OcrController from '../domains/size/ocrwithgoogle/ocr.controller.js';

// const router = express.Router();

// // 이미지 경로를 쿼리 파라미터로 받아서 결과를 반환
// router.get('/sizeresults', (req, res) => {
//     const imagePath = req.query.imagePath; // 클라이언트로부터 경로를 쿼리 파라미터로 받음
//     OcrController.uploadAndDetect(req, res, imagePath);
// });

// export default router;

// import express from 'express';
// import OcrController from '../domains/size/ocrwithgoogle/ocr.controller.js';

// const router = express.Router();

// // 이미지 경로를 쿼리 파라미터로 받아서 사이즈 비교 결과를 반환
// router.get('/sizeresults', async (req, res) => {
//     const imagePath = req.query.imagePath; // 클라이언트로부터 경로를 쿼리 파라미터로 받음
    
//     if (!imagePath) {
//         return res.status(400).json({
//             isSuccess: false,
//             code: "400",
//             message: "imagePath 쿼리 파라미터가 필요합니다."
//         });
//     }

//     try {
//         // uploadAndDetect 메소드를 호출하여 텍스트 감지 및 사이즈 비교
//         await OcrController.uploadAndDetect({ ...req, file: { path: imagePath } }, res);
//     } catch (error) {
//         console.error('Error in /sizeresults route:', error);
//         res.status(500).json({
//             isSuccess: false,
//             code: "500",
//             message: error.message
//         });
//     }
// });

// export default router;
// import express from 'express';
// import OcrController from '../domains/size/ocrwithgoogle/ocr.controller.js';

// const router = express.Router();

// // 이미지 경로를 쿼리 파라미터로 받아서 사이즈 비교 결과를 반환
// router.get('/sizeresults', async (req, res) => {
//     const imagePath = req.query.imagePath; // 클라이언트로부터 경로를 쿼리 파라미터로 받음
    
//     if (!imagePath) {
//         return res.status(400).json({
//             isSuccess: false,
//             code: "400",
//             message: "imagePath 쿼리 파라미터가 필요합니다."
//         });
//     }

//     try {
//         // uploadAndDetect 메소드를 호출하여 텍스트 감지 및 사이즈 비교
//         await OcrController.uploadAndDetect({ ...req, file: { path: imagePath } }, res);
//     } catch (error) {
//         console.error('Error in /sizeresults route:', error);
//         res.status(500).json({
//             isSuccess: false,
//             code: "500",
//             message: error.message
//         });
//     }
// });

// export default router;
import express from 'express';
import OcrController from '../domains/size/ocrwithgoogle/ocr.controller.js';

const router = express.Router();

// 이미지 경로를 쿼리 파라미터로 받아서 사이즈 비교 결과를 반환
router.get('/sizeresults', async (req, res) => {
    const imagePath = req.query.imagePath; // 클라이언트로부터 경로를 쿼리 파라미터로 받음
    
    // imagePath가 없는 경우 400 에러 반환
    if (!imagePath) {
        return res.status(400).json({
            isSuccess: false,
            code: "400",
            message: "imagePath 쿼리 파라미터가 필요합니다."
        });
    }

    try {
        // uploadAndDetect 메소드를 호출하여 텍스트 감지 및 사이즈 비교
        await OcrController.uploadAndDetect({ ...req, file: { path: imagePath } }, res);
    } catch (error) {
        console.error('Error in /sizeresults route:', error); // 에러 로깅
        res.status(500).json({
            isSuccess: false,
            code: "500",
            message: error.message || "서버 오류 발생" // 기본 메시지 추가
        });
    }
});

export default router;
