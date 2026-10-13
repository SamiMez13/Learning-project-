import { AppError } from "../errors/AppError";
import { Request, Response , NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt";

export function authenticate(
    req: Request,
    _res:Response,
    next: NextFunction
):void {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ' )) {
        throw new AppError(401, "Access token is required")
    }

    const token = authHeader.split(" ")[1];
    
    req.user= verifyAccessToken(token);

    next();


}