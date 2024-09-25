import { Op } from "sequelize";
import db from "../../db/index.js";
export async function FindUserRepository(nickname,email){
    try{
        const isExistUser = await db.Member.findOne({
            where: {
                [Op.and]: [
                  { nickname },
                  { email }
                ]
            }
        });
        return isExistUser;
    }catch(err){
        console.error(err);
        return false;
    }
}

export async function AuthResetPasswordRepository(nickname,email,user_id){
    try{
        const isExistUser = await db.Member.findOne({
            where: {
                [Op.and]: [
                  { nickname },
                  { email },
                  { user_id },
                ]
            }
        });
        return isExistUser;
    }catch(err){
        console.error(err);
        return false;
    }
}

export async function SetResetPasswordRepository(uuid,hashedPassword){
    try{
        const result = await db.Member.update({
            password:hashedPassword,
        }, {
            where: {
                uuid,
            }
        });
        return result;
    }catch(err){
        console.error(err);
        return false;
    }
}