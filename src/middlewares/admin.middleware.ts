import { Request, Response , NextFunction } from "express";
import { AppError } from "../errors/AppError";


export function requireAdmin(
    req: Request,
    _res:Response,
    next: NextFunction
):void {
    if (req.user?.role ==="ADMIN"){
        next();
    }else{
        throw new AppError(403,"Admin role is required , it seems that you're not an admin")
    }
}