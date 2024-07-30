import db from "../../db/index.js";

export async function ExistUserId(user_id){
    try{
        const isExistUserId = await db.User.findOne({ where: { user_id }})
        if (isExistUserId) {
            return true;
        }
        return false;
    }catch(err){
        console.error(err);
        return true;
    }
}

export async function CreateUser(user_id,hashedPassword,email){
    try{
        const result = await db.User.create({
            user_id,
            password:hashedPassword,
            email,
        })
        if(!result){
            return false
        }
        return true;
    }catch(err){
        console.error(err);
        return false;
    }
}