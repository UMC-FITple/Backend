// export const uploadSizeController = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: '파일이 업로드되지 않았습니다.' });
//         }
//         const result = await uploadSizeImage(req.file);
//         res.status(200).json({ message: '이미지 업로드 성공', imageUrl: result });
//     } catch (error) {
//         res.status(500).json({ message: '업로드 실패', error: error.message });
//     }
// };


import { uploadSizeImage } from './uploadsize.service.js';
import { response } from "../../../config/response.js";
import { status } from '../../../config/response.status.js';

export const uploadSizeController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json(response({ isSuccess: false, code: "400", message: '파일이 업로드되지 않았습니다.' }, null));
        }
        const result = await uploadSizeImage(req.file);
        
        // 성공적으로 업로드 되었을 때의 응답 형식
        return res.status(200).json(response({ isSuccess: true, code: "200", message: '이미지 업로드 성공' }, {
            imagePath: result.imagePath,
            imageId: result.imageId
        }));
    } catch (error) {
        return res.status(500).json(response({ isSuccess: false, code: "500", message: '업로드 실패' }, error.message));
    }
};
