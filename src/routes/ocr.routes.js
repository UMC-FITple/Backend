import express from 'express';
import OcrController from '../domains/size/ocrwithgoogle/ocr.controller.js';

const router = express.Router();

// 이미지 경로를 쿼리 파라미터로 받아서 결과를 반환
router.get('/uploadsize', (req, res) => {
    const imagePath = req.query.imagePath; // 클라이언트로부터 경로를 쿼리 파라미터로 받음
    OcrController.uploadAndDetect(req, res, imagePath);
});

export default router;
