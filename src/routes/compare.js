import express from 'express';
import { compareSizes } from '../domains/OCRCompareSize/compare.controller.js';

const router = express.Router();

router.post('/compare', compareSizes); // 사이즈 비교 요청 처리

export default router;
