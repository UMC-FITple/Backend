import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { AuthResetPasswordCookie, AuthResetPasswordService, FindUserIdService, SetResetPasswordService, SetResetPasswordVerifyToken } from "./auth.service.js";
export async function FindUserId(req, res) {
    try {
        const { nickname, email} = req.body;

        if (!nickname || !email) {
            return res.status(401).send(response(status.FIND_ID_EMPTY_DATA));
        }

        const result = await FindUserIdService(nickname,email);

        if (result.code == 401) {
            return res.status(402).send(response(status.FIND_ID_USER_NOT_FOUND));
        }
        if(result.code == 500){
            return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
        }

        return res.send(response(status.SUCCESS,result));
    } catch (err) {
        console.error(err);
        return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function AuthResetPassword(req, res) {
    try {
        const { nickname, email, user_id } = req.body;

        if (!nickname || !email || !user_id) {
            return res.status(401).send(response(status.AUTH_RESET_PASSWORD_EMPTY_DATA));
        }

        const result = await AuthResetPasswordService(nickname, email, user_id);

        if (result.code == 401) {
            return res.status(402).send(response(status.AUTH_RESET_PASSWORD_USER_NOT_FOUND));
        }
        if (result.code == 500) {
            return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
        }

        const newPasswordKey = await AuthResetPasswordCookie(result.uuid);

        res.cookie('newPasswordKey', newPasswordKey, { httpOnly: true, secure: false });

        return res.send(response(status.SUCCESS));
    } catch (err) {
        console.error(err);
        return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export async function SetResetPassword(req, res) {
    try {
        const newPasswordKey = req.cookies.newPasswordKey;
        if(!newPasswordKey){
            return res.status(401).send(response(status.SET_RESET_PASSWORD_EMPTY_TOKEN));
        }

        const decoded = await SetResetPasswordVerifyToken(newPasswordKey);

        if(!decoded){
            return res.status(406).send(response(status.SET_RESET_PASSWORD_VERIFY_TOKEN_ERROR));
        }

        const uuid = decoded.uuid;
        const { newPassword } = req.body;
        if (!newPassword ) {
            return res.status(402).send(response(status.SET_RESET_PASSWORD_EMPTY_NEW_PASSWORD));
        }

        const result = await SetResetPasswordService(uuid,newPassword);
        if(result.code == 403){
            return res.status(403).send(response(status.SET_RESET_PASSWORD_CHANGE_PASSWORD_ERROR));
        }
        if(result.code == 500){
            return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
        }

        res.clearCookie('newPasswordKey');

        return res.send(response(status.SUCCESS));
    } catch (err) {
        console.error(err);
        return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}
