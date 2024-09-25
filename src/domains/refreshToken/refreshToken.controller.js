import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { refreshTokenService } from "./refreshToken.service.js";

export async function refreshTokenLogic(req, res) {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).send(response(status.REFRESH_TOKEN_NOT_PROVIDED));
        }
        const result = await refreshTokenService(token);

        if (!result.success) {
            return res.status(402).send(response(status.REFRESH_TOKEN_INVALID));
        }

        res.cookie('accessToken', result.accessToken, { httpOnly: true, secure: false });
        res.cookie('refreshToken', result.refreshToken, { httpOnly: true, secure: false });

        return res.send(response(status.SUCCESS));
    } catch (err) {
        console.error(err);
        return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}
