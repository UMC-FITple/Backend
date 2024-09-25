import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { response } from "../config/response.js";
import { status } from "../config/response.status.js";

dotenv.config();

export const tempRouter = express.Router();

tempRouter.post('/', tempLogin);


export async function tempLogin(req, res) {
        const user_id = 6;
        const password = 1234567;

        const LoginData = { user_id, password };

        const result = await LoginService(LoginData);

        res.cookie('accessToken', result.accessToken, { httpOnly: true, secure: false });

        return res.send(response(status.SUCCESS, result.accessToken));
}

export async function LoginService(LoginData) {
        const accessToken = jwt.sign({ 
            uuid: 6,
        }, process.env.JWT_SECRET_KEY, { 
            expiresIn: '1h' 
        });

        return { success: true, accessToken };
}