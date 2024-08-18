import jwt from 'jsonwebtoken';
import { response } from '../config/response.js';
import { status } from '../config/response.status.js';

export async function LoginCheck(req,res,next){
    try{
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).send(response(status.TOKEN_NOT_PROVIDED));
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        res.locals.uuid = decoded.uuid;

        next();
    }catch(err){
        if(err.name === "TokenExpiredError"){
            return res.status(402).send(response(status.TOKEN_EXPIRED));
        }
        return res.status(403).send(response(status.INVALID_TOKEN));
    }
}