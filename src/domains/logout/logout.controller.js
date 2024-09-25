import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

export async function LogoutLogic(req, res) {
    try {
        if(!req.cookies.accessToken || !req.cookies.refreshToken){
            return res.json(400).send(response(status.BAD_REQUEST))
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.send(response(status.SUCCESS));
    } catch (err) {
        console.error(err);
        return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}