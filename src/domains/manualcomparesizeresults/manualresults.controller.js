import { findBestFit } from './manualresults.service.js';
import { response } from "../../config/response.js";

const getBestFit = async (req, res) => {
    try {
        const clothId = req.params.clothId; // clothId를 URL 파라미터로 받음
        const bestFit = await findBestFit(clothId);

        // 성공적으로 데이터를 찾은 경우
        res.json(response({
            isSuccess: true,
            code: 200,
            message: '최적의 사이즈를 성공적으로 찾았습니다.',
        }, bestFit));
    } catch (error) {
        // 오류가 발생한 경우
        res.status(500).json(response({
            isSuccess: false,
            code: 500,
            message: '서버 오류가 발생했습니다.',
        }, null));
    }
};

export { getBestFit };
