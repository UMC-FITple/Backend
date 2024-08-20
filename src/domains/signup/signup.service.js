import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUser, ExistUserId } from "./signup.dao.js";

export async function SignupService(signupData) {
    try {
        const { user_id, password, email } = signupData;

        const isExist = await ExistUserId(user_id);

        if (isExist) {
            return { success: false, code: "401", message: "존재하는 아이디입니다." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await CreateUser(user_id, hashedPassword, email);

        if (!result) {
            return { success: false, code: "403", message: "회원가입 중 에러 발생" };
        }

        // 로그인이 확인 되었을 경우 JWT 토큰 발행
        const accessToken = jwt.sign({ 
            uuid: result.uuid,
        }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '5m' 
        });
    
        const refreshToken = jwt.sign({
            uuid: result.uuid,
        }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '1h' 
        });

        return { success: true, accessToken, refreshToken };
    } catch (err) {
        console.error(err);
        return { success: false, code: "404", message: "서버 오류" };
    }
}
