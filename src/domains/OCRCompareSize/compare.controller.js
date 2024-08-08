// export const compareSizes = async (req, res) => {
//     const userInput = req.body; // 사용자가 입력한 사이즈 데이터
//     const ocrText = req.body.ocrText; // OCR로 읽어온 텍스트

//     try {
//         const recommendedSize = await compareService.findClosestSize(userInput, ocrText);
//         res.status(200).json({ recommendedSize });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

import { detectSizeFromImage } from './compare.service.js';
import * as compareService from './compare.service.js';


export const compareSizes = async (req, res) => {
    const imagePath = req.body.imagePath; // 요청 본문에서 이미지 경로를 가져옴

    try {
        const recommendedSizes = await detectSizeFromImage(imagePath);
        res.status(200).json({ recommendedSizes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
