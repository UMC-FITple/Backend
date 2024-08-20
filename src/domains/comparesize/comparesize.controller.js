import compareSizeService from './comparesize.service.js';

export const createCompareSize = async (req, res) => {
  const {
    size,
    totalLength,
    shoulderWidth,
    chestWidth,
    armholeWidth,
    sleeveWidth,
    sleeveLength,
    hemWidth,
  } = req.body;

  const newCompareSize = await compareSizeService.createCompareSize({
    size,
    totalLength,
    shoulderWidth,
    chestWidth,
    armholeWidth,
    sleeveWidth,
    sleeveLength,
    hemWidth,
  });

  res.status(201).json(newCompareSize);
};

export const getCompareSizes = async (req, res) => {
  const compareSizes = await compareSizeService.getCompareSizes();
  res.status(200).json(compareSizes);
};

export const getCompareSizeById = async (req, res) => {
  const { id } = req.params;
  const compareSize = await compareSizeService.getCompareSizeById(id);
  res.status(200).json(compareSize);
};

export const updateCompareSize = async (req, res) => {
  const { id } = req.params;
  const {
    size,
    totalLength,
    shoulderWidth,
    chestWidth,
    armholeWidth,
    sleeveWidth,
    sleeveLength,
    hemWidth,
  } = req.body;

  const updatedCompareSize = await compareSizeService.updateCompareSize(id, {
    size,
    totalLength,
    shoulderWidth,
    chestWidth,
    armholeWidth,
    sleeveWidth,
    sleeveLength,
    hemWidth,
  });

  res.status(200).json(updatedCompareSize);
};

export const deleteCompareSize = async (req, res) => {
  const { id } = req.params;
  await compareSizeService.deleteCompareSize(id);
  res.status(204).end();
};
