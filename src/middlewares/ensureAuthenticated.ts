import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import {verify} from 'jsonwebtoken'


interface TokenPayLoad {
    role: string,
    sub: string
}

export async function ensureAuthenticated(request:Request, response:Response, next:NextFunction){

    try {
        const authHeader = request.headers.authorization

        if (!authHeader) {
            throw new AppError('Token not found', 401)
        }

        const [, token] = authHeader.split(' ')


        const {role, sub: user_id} = verify(token, authConfig.jwt.secret) as TokenPayLoad

        request.user = {
            id: user_id,
            role
        }

        return next()

    } catch (error) {
        console.log(error)

        throw new AppError('Invalid Token', 401)
        
    }

}