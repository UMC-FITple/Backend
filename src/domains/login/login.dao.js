import db from "../../db/index.js";

export async function ExistUser(user_id){
    try{
        // 사용자 아이디가 존재하는지 확인
        const isExistUser = await db.Member.findOne({ where: { user_id } });
        if (!isExistUser) {
            return false
        }
        return isExistUser
    }catch(err){
        console.error("login/ExistUser error: ",err);
        return false;
    }
}