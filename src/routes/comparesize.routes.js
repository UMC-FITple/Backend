import express from 'express';
import {
  createCompareSize,
  getCompareSizes,
  getCompareSizeById,
  updateCompareSize,
  deleteCompareSize,
} from '../domains/comparesize/comparesize.controller.js';

const router = express.Router();

router.post('/', createCompareSize);
router.get('/', getCompareSizes);
router.get('/:id', getCompareSizeById);
router.put('/:id', updateCompareSize);
router.delete('/:id', deleteCompareSize);

export default router;
