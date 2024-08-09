import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { memberResponseDTO } from "./recommend.dto.js"
import { getMemberByID, recommend_user_bodyinfo_byID } from "./recommend.dao.js";

export const recommend_user_bodyinfo = async (body) => {
    const birth = new Date(body.birth);
    const prefer = body.prefer;

    console.log("body in recommend user_bodyinfo: ", body);
3
    const recommendUserData = await recommend_user_bodyinfo_byID ({
        'id': body.id,
    });

    if(recommendUserData == -1){
        throw new BaseError(status.PARAMETER_IS_WRONG); // 에러 메세지 수정 필요!
    }else{
        return memberResponseDTO(await getMemberByID(recommendUserData));
    }
}