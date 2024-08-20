import compareSizeService from './comparesize.service.js';
import { response } from "../../config/response.js";

// export const createCompareSize = async (req, res) => {
//   const {
//     size,
//     totalLength,
//     shoulderWidth,
//     chestWidth,
//     armholeWidth,
//     sleeveWidth,
//     sleeveLength,
//     hemWidth,
//   } = req.body;

//   const newCompareSize = await compareSizeService.createCompareSize({
//     size,
//     totalLength,
//     shoulderWidth,
//     chestWidth,
//     armholeWidth,
//     sleeveWidth,
//     sleeveLength,
//     hemWidth,
//   });

//   res.status(201).json(newCompareSize);
// };

// export const getCompareSizes = async (req, res) => {
//   const compareSizes = await compareSizeService.getCompareSizes();
//   res.status(200).json(compareSizes);
// };

// export const getCompareSizeById = async (req, res) => {
//   const { id } = req.params;
//   const compareSize = await compareSizeService.getCompareSizeById(id);
//   res.status(200).json(compareSize);
// };

// export const updateCompareSize = async (req, res) => {
//   const { id } = req.params;
//   const {
//     size,
//     totalLength,
//     shoulderWidth,
//     chestWidth,
//     armholeWidth,
//     sleeveWidth,
//     sleeveLength,
//     hemWidth,
//   } = req.body;

//   const updatedCompareSize = await compareSizeService.updateCompareSize(id, {
//     size,
//     totalLength,
//     shoulderWidth,
//     chestWidth,
//     armholeWidth,
//     sleeveWidth,
//     sleeveLength,
//     hemWidth,
//   });

//   res.status(200).json(updatedCompareSize);
// };

// export const deleteCompareSize = async (req, res) => {
//   const { id } = req.params;
//   await compareSizeService.deleteCompareSize(id);
//   res.status(204).end();
// };


export const createCompareSize = async (req, res) => {
  try {
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

    res.status(201).json(response({ isSuccess: true, code: 201, message: 'Compare size created successfully.' }, newCompareSize));
  } catch (error) {
    res.status(500).json(response({ isSuccess: false, code: 500, message: 'Failed to create compare size.' }, null));
  }
};

export const getCompareSizes = async (req, res) => {
  try {
    const compareSizes = await compareSizeService.getCompareSizes();
    res.status(200).json(response({ isSuccess: true, code: 200, message: 'Compare sizes retrieved successfully.' }, compareSizes));
  } catch (error) {
    res.status(500).json(response({ isSuccess: false, code: 500, message: 'Failed to retrieve compare sizes.' }, null));
  }
};

export const getCompareSizeById = async (req, res) => {
  try {
    const { id } = req.params;
    const compareSize = await compareSizeService.getCompareSizeById(id);
    
    if (!compareSize) {
      return res.status(404).json(response({ isSuccess: false, code: 404, message: 'Compare size not found.' }, null));
    }

    res.status(200).json(response({ isSuccess: true, code: 200, message: 'Compare size retrieved successfully.' }, compareSize));
  } catch (error) {
    res.status(500).json(response({ isSuccess: false, code: 500, message: 'Failed to retrieve compare size.' }, null));
  }
};

export const updateCompareSize = async (req, res) => {
  try {
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

    if (!updatedCompareSize) {
      return res.status(404).json(response({ isSuccess: false, code: 404, message: 'Compare size not found for update.' }, null));
    }

    res.status(200).json(response({ isSuccess: true, code: 200, message: 'Compare size updated successfully.' }, updatedCompareSize));
  } catch (error) {
    res.status(500).json(response({ isSuccess: false, code: 500, message: 'Failed to update compare size.' }, null));
  }
};

export const deleteCompareSize = async (req, res) => {
  try {
    const { id } = req.params;
    await compareSizeService.deleteCompareSize(id);
    res.status(204).json(response({ isSuccess: true, code: 204, message: 'Compare size deleted successfully.' }, null));
  } catch (error) {
    res.status(500).json(response({ isSuccess: false, code: 500, message: 'Failed to delete compare size.' }, null));
  }
};
