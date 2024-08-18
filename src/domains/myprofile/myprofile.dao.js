import db from "../../db/index.js";

export async function BodyInfoDataSaveDao(bodyInfo,uuid) {
    try {   
        await db.Body_Info.create({
            uuid,
            height: bodyInfo.height,
            weight: bodyInfo.weight,
            shoulder_width: bodyInfo.shoulder_width,
            chest_circumference: bodyInfo.chest_circumference,
            arm_length: bodyInfo.arm_length,
            waist_circumference: bodyInfo.waist_circumference,
            thigh_circumference: bodyInfo.thigh_circumference,
            hip_circumference: bodyInfo.hip_circumference
        });
        
        return true;
    } catch (err) {
        if(err.name == "SequelizeUniqueConstraintError"){
            console.log("이미 정보가 존재합니다.");
            return ({ isSuccess: false, code: 401 ,message: '이미 정보가 존재합니다.' });
        }
        console.log(err);
        return ({ isSuccess: false, code: 402 ,message: 'bodyInfo 저장중 오류' });
    }
}

export async function UserInfoDataSaveDao(userInfo,uuid) {
    try {   
        await db.Member.update(
            {
                nickname: userInfo.nickname,
                gender: userInfo.gender,
                one_line_info: userInfo.one_line_info
            },
            {
                where: {
                    uuid,
                }
            }
        );
        for (let fit of userInfo.perfer_fit) {
            const preferFit = await db.PreferFit.findOne({ where: { pf_name: fit } });
            if (preferFit) {
                await db.UserFit.create({
                    uuid: uuid,
                    pf_name:fit,
                });
            } else {
                await db.PreferFit.create({
                    pf_name:fit
                });
                await db.UserFit.create({
                    uuid: uuid,
                    pf_name:fit,
                });
            }
        }

        for (let style of userInfo.perfer_style) {
            const preferStyle = await db.Style.findOne({ where: { style_name: style } });
            if (preferStyle) {
                await db.UserStyle.create({
                    uuid: uuid,
                    style_name:style,
                });
            } else {
                await db.Style.create({
                    style_name:style
                });
                await db.UserStyle.create({
                    uuid: uuid,
                    style_name: style,
                });
            }
        }
        return true;
    } catch (err) {
        if(err.name=="SequelizeUniqueConstraintError"){
            return ({ isSuccess: false, code: 405 ,message: '이미 존재하는 닉네임입니다.' });
        }
        console.error(err);
        return ({ isSuccess: false, code: 403 ,message: 'userInfo 저장중 오류' });
    }
}

export async function UserImageDataSaveDao(uuid,img_url){
    try{
        await db.Member.update(
            {
                img_url,
            },
            {
                where: {
                    uuid,
                }
            }
        );
        return true;
    }catch(err){
        console.error(err);
        return ({ isSuccess: false, code: 404,message: 'userImage 저장 중 오류' });
    }
}