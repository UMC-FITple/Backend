import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { SignupService } from "./signup.service.js";
import { createSignupDTO } from './signup.dto.js'; // 경로 수정

export async function SignupLogic(req, res) {
    const { email, user_id, password } = req.body;

    if (!email || !user_id || !password) {
        return res.status(402).send(response(status.SIGNUP_EMPTY_DATA));
    }

    const signupData = createSignupDTO(user_id, password, email);

    try {
        const result = await SignupService(signupData);

        if (result.code === "401") {
            return res.status(401).send(response(status.USERID_ALREADY_EXIST));
        } 
        if (result.code === "403") {
            return res.status(403).send(response(status.SIGNUP_ERROR));
        } 
        if (result.code === "404") {
            return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
        } 

        res.cookie('accessToken', result.accessToken, { httpOnly: true, secure: false });
        res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: false });

        return res.send(response(status.SUCCESS,result.accessToken));
    } catch (err) {
        console.error(err);
        return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}
