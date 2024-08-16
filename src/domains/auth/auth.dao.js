import { Op } from "sequelize";
import db from "../../db/index.js";
export async function FindUserRepository(name,email){
    try{
        const isExistUser = await db.Member.findOne({
            where: {
                [Op.and]: [
                  { name },
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

export async function AuthResetPasswordRepository(name,email,user_id){
    try{
        const isExistUser = await db.Member.findOne({
            where: {
                [Op.and]: [
                  { name },
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