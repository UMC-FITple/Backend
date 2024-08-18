import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { MyprofileSaveService } from "./myprofile.service.js";

export async function MyprofileSaveLogic(req, res) {
    try {
        if(!req.file){
            return res.status(401).send(response(status.MYPROFILE_EMPTY_IMG));
        }
        const img_url = req.file.location;

        if(!req.body.data){
            return res.status(402).send(response(status.MYPROFILE_EMPTY_DATA));
        }
        const jsonData = JSON.parse(req.body.data);
        const { userInfo, bodyInfo } = jsonData;

        if(!userInfo, !bodyInfo){
            return res.status(402).send(response(status.MYPROFILE_EMPTY_DATA));
        }

        const uuid = res.locals.uuid;

        const result = await MyprofileSaveService(userInfo,uuid,bodyInfo,img_url);

        if (result.code == 401) {
            return res.status(403).send(response(status.MYPROFILE_EXIST_BODY_INFO));
        }
        if(result.code == 402){
            return res.status(404).send(response(status.MYPROFILE_BODY_INFO_SAVE_ERROR));
        }
        if(result.code == 403){
            return res.status(405).send(response(status.MYPROFILE_USER_INFO_SAVE_ERROR));
        }
        if(result.code == 404){
            return res.status(406).send(response(status.MYPROFILE_USER_IMG_SAVE_ERROR));
        }
        if(result.code == 405){
            return res.status(407).send(response(status.MYPROFILE_EXIST_USER_NICKNAME));
        }
        if(result.code === 500){
            return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
        }

        return res.send(response(status.SUCCESS));
    } catch (err) {
        console.error(err);
        return res.status(500).send(response(status.INTERNAL_SERVER_ERROR));
    }
}
