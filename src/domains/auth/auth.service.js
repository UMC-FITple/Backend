import { AuthResetPasswordRepository, FindUserRepository, SetResetPasswordRepository } from "./auth.dao.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function FindUserIdService(name,email){
    try{
        const isExistUser = await FindUserRepository(name,email);
        if(!isExistUser){
            return { success: false, code:401 ,message: "사용자 존재하지 않음" };
        }
        const userData = {
            email:isExistUser.email,
            name:isExistUser.name,
            user_id:isExistUser.user_id,
        }
        return userData;
    }catch(err){
        console.error(err);
        return { success: false, code:500 ,message: "서버 오류" };
    }
}

export async function AuthResetPasswordService(name, email, user_id){
    try{
        const isExistUser = await AuthResetPasswordRepository(name,email,user_id);
        if(!isExistUser){
            return { success: false, code:401 ,message: "사용자 존재하지 않음" };
        }
        return isExistUser;
    }catch(err){
        console.error(err);
        return { success: false, code:500 ,message: "서버 오류" };
    }
}
export async function AuthResetPasswordCookie(uuid){
    try{
        const newPasswordKey = jwt.sign({
            uuid,
        }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '5m' 
        });
        return newPasswordKey;
    }catch(err){
        console.error(err);
        return { success: false, code:500 ,message: "서버 오류" }; 
    }
}

export async function SetResetPasswordVerifyToken(token){
    try{
        const result = jwt.verify(token,process.env.JWT_SECRET_KEY);
        return result;
    }catch(err){
        console.error(err);
        return { success: false, code:500 ,message: "서버 오류" }; 
    }
}

export async function SetResetPasswordService(uuid,newPassword){
    try{
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const SetResetPassword = await SetResetPasswordRepository(uuid,hashedPassword);
        if(!SetResetPassword){
            return { success: false, code:403 ,message: "비밀번호 변경 실패" };
        }
        return SetResetPassword
    }catch(err){
        console.error(err);
        return { success: false, code:500 ,message: "서버 오류" }; 
    }
}