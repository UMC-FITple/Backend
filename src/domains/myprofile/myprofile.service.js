import { BodyInfoDataSaveDao, UserImageDataSaveDao, UserInfoDataSaveDao } from "./myprofile.dao.js";

export async function MyprofileSaveService(userInfo,uuid,bodyInfo,img_url) {
    try {   
        const bodyInfoSave = await BodyInfoDataSaveDao(bodyInfo,uuid);
        if(bodyInfoSave.code == 401){
           return ({ isSuccess: false, code: 401 ,message: '이미 정보가 존재합니다.' });
        }
        if(bodyInfoSave.code == 402){
            return ({ isSuccess: false, code: 402 ,message: 'body_Info 저장 중 오류' });
        }

        const userInfoSave = await UserInfoDataSaveDao(userInfo,uuid);

        if(userInfo.gender != 0 && userInfo.gender != 1){
            return ({ isSuccess: false, code: 408 ,message: '존재하지 않는 성별' });
        }
        if(userInfoSave.code == 403){
            return ({ isSuccess: false, code: 403 ,message: 'userInfo 저장중 오류' });
        }
        if(userInfoSave.code == 405){
            return ({ isSuccess: false, code: 405 ,message: 'userInfo 저장중 닉네임 중복 오류' });
        }
        if(userInfoSave.code == 406){
            return ({ isSuccess: false, code: 406 ,message: '존재하지 않는 선호 핏' });
        }
        if(userInfoSave.code == 407){
            return ({ isSuccess: false, code: 407 ,message: '존재하지 않는 선호 스타일' });
        }
        const userImgSave = await UserImageDataSaveDao(uuid,img_url);
        if(userImgSave.code == 404){
            return ({ isSuccess: false, code: 404 ,message: 'userImage 저장중 오류' });
        }

        return true
    } catch (err) {
        console.error(err);
        return ({ isSuccess: false, code: 500})
    }
}
