import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { SignupService } from "./signup.service.js";
import { createSignupDTO } from './signup.dto.js'; // 경로 수정

export async function SignupLogic(req, res) {
    const { email, user_id, password } = req.body;

    if (!email || !user_id || !password) {
        return res.send(response(status.EMPTY_DATA));
    }

    const signupData = createSignupDTO(user_id, password, email);

    try {
        const result = await SignupService(signupData);

        if (result.code === "401") {
            return res.send(response(status.USERID_ALREADY_EXIST));
        } else if (result.code === "403") {
            return res.send(response(status.SIGNUP_ERROR));
        } else if (result.code === "404") {
            return res.send(response(status.INTERNAL_SERVER_ERROR));
        } else {
            return res.send(response(status.SUCCESS));
        }
    } catch (err) {
        console.error(err);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}
