import jwt from 'jsonwebtoken';

export async function refreshTokenService(token) {
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const accessToken = jwt.sign({ 
            uuid: decoded.uuid,
        }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '30m' 
        });
    
        const refreshToken = jwt.sign({
            uuid: decoded.uuid,
        }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '1h' 
        });
        
        return { success: true, accessToken, refreshToken };
    } catch (err) {
        console.error(err);
        return { success: false, message: '토큰 인증 오류' };
    }
}
