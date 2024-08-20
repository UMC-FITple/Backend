import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const tempRouter = express.Router({mergeParams: true});

tempRouter.post('/', (req, res) => {
    // 임시 사용자 정보
    const tempUser = { uuid: 6 };
    const tempToken = jwt.sign(tempUser, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // 1시간 유효
    res.cookie('accessToken', tempToken, { httpOnly: true, secure: false });
    res.cookie('refreshToken', tempToken, { httpOnly: true, secure: false });
    res.json({ token: tempToken });
});
