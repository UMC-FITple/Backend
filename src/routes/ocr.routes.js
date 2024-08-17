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

// import express from 'express';
// import OcrController from '../domains/size/ocrwithgoogle/ocr.controller.js';

// const router = express.Router();

// // 이미지 경로를 쿼리 파라미터로 받아서 사이즈 비교 결과를 반환
// router.get('/sizeresults', async (req, res) => {
//     const imagePath = req.query.imagePath; // 클라이언트로부터 경로를 쿼리 파라미터로 받음
    
//     // imagePath가 없는 경우 400 에러 반환
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
//         console.error('Error in /sizeresults route:', error); // 에러 로깅
//         res.status(500).json({
//             isSuccess: false,
//             code: "500",
//             message: error.message || "서버 오류 발생" // 기본 메시지 추가
//         });
//     }
// });

// export default router;

// src/routes/ocr.routes.js
// import express from 'express';
// import ocrController from '../controllers/ocr.controller';

// const router = express.Router();

// router.use('/ocr', ocrController);

// export default router;


// import express from 'express';
// // import * as ocrController from '../size/ocrwithgoogle/ocr.controller.js';
// // import OcrController from '../domains/size/ocrwithgoogle/ocr.controller.js';
// import * as ocrController from '../domains/size/ocrwithgoogle/ocr.controller.js';

// const router = express.Router();

// router.get('/compare-size', ocrController.compareSize);
// // router.post('/compare-size', ocrController.compareSize);

// export default router;

// import express from 'express';
// import ocrController from '../size/ocr.controller.js';

// const router = express.Router();

// // GET 요청을 사용하여 사이즈 비교 API 설정
// router.get('/compare-sizes', ocrController.getComparisonResult);

// export default router;
import express from 'express';
import ocrController from '../domains/size/ocrwithgoogle/ocr.controller.js';

const router = express.Router();

router.get('/size-matching', ocrController.getSizeMatchingResult);

export default router;
