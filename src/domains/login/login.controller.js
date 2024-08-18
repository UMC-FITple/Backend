import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { LoginDTO } from "./login.dto.js";
import { LoginService } from "./login.service.js";

export async function LoginLogic(req, res) {
    try {
        const { user_id, password } = req.body;

        if (!user_id || !password) {
            return res.status(402).send(response(status.LOGIN_EMPTY_DATA));
        }

        const LoginData = LoginDTO(user_id, password);

        const result = await LoginService(LoginData);

        if (result.code == 401) {
            return res.status(401).send(response(status.USER_NOT_FOUND));
        }
        if(result.code == 403){
            return res.status(403).send(response(status.PASSWORD_MISMATCH));
        }
        if(result.code == 500){
            return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
        }

        res.cookie('accessToken', result.accessToken, { httpOnly: true, secure: false });
        res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: false });

        return res.send(response(status.SUCCESS, result.accessToken));
    } catch (err) {
        console.error(err);
        return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}