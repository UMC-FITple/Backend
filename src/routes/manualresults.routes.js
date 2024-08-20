import express from 'express';
import { getBestFit } from '../domains/manualcomparesizeresults/manualresults.controller.js';

const router = express.Router();

// router.get('/:userId/best-fit', getBestFit);
router.get('/:clothId/best-fit', getBestFit);

export default router;
