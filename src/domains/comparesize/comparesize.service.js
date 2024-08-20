import compareSizeDao from './comparesize.dao.js';

const createCompareSize = async (compareSizeData) => {
  return compareSizeDao.createCompareSize(compareSizeData);
};

const getCompareSizes = async () => {
  return compareSizeDao.getCompareSizes();
};

const getCompareSizeById = async (id) => {
  return compareSizeDao.getCompareSizeById(id);
};

const updateCompareSize = async (id, compareSizeData) => {
  return compareSizeDao.updateCompareSize(id, compareSizeData);
};

const deleteCompareSize = async (id) => {
  return compareSizeDao.deleteCompareSize(id);
};

export default {
  createCompareSize,
  getCompareSizes,
  getCompareSizeById,
  updateCompareSize,
  deleteCompareSize,
};
