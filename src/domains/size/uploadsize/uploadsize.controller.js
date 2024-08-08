import { uploadSizeImage } from './uploadsize.service.js';

export const uploadSizeController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
        }
        const result = await uploadSizeImage(req.file);
        res.status(200).json({ message: '이미지 업로드 성공', imageUrl: result });
    } catch (error) {
        res.status(500).json({ message: '업로드 실패', error: error.message });
    }
};
