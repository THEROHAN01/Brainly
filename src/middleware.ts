import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_PASSWORD = "Rohan" ;



// this midleware takes the token from the authorisation header and authenticates the user usinng the jwt secret 
export const userMiddleware = (req:Request , res:Response , next:NextFunction) => {
    const header = req.headers["authorization"];

    const decoded  = jwt.verify(header as string , JWT_PASSWORD);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next()

    }else{
        res.status(403).json({
            message: "bro tu logged in nahi hai (ye middleware bol raha hu mai)"
        });
    }


}