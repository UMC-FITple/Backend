import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ExistUser } from './login.dao.js';

export async function LoginService(loginData) {
    try {
        const { user_id,password } = loginData;
        // 사용자 존재 확인
        const user = await ExistUser(user_id);

        if (!user) {
            return { code:401 ,success: false, message: '존재하지 않는 아이디입니다.' };
        }

        // 존재할 경우 비밀번호가 일치하는지 확인
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
            return { code:403 ,success: false, message: '비밀번호가 일치하지 않습니다.' };
        }
        
        // 로그인이 확인 되었을 경우 JWT 토큰 발행
        const accessToken = jwt.sign({ 
            uuid: user.uuid,
        }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '30m' 
        });
    
        const refreshToken = jwt.sign({
            uuid: user.uuid,
        }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '1h' 
        });

        return { success: true, accessToken, refreshToken };
    } catch (err) {
        console.error(err);
        return { code:500, success: false, message: '서버 오류' };
    }
}