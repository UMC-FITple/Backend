import { saveImageToDB } from './uploadsize.dao.js';

// export const uploadSizeImage = async (file) => {
//     const imagePath = file.path; // 업로드된 파일의 경로
//     await saveImageToDB(imagePath); // DB에 저장
//     return imagePath; // 이미지 경로 반환
// };

export const uploadSizeImage = async (file) => {
    if (!file || !file.path) {
        throw new Error('Invalid file object');
    }
    const imagePath = file.path;
    const imageId = await saveImageToDB(imagePath);
    return { imagePath, imageId };
};
