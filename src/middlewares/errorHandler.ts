import  { Request, Response, NextFunction } from "express"
import {logger} from "../lib/logger.js"

export function errorHandler(
    err: Error,
    _req: Request, 
    res: Response,
    _next: NextFunction
) : void {
    logger.error({err}, "Unhandled Error")   
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    })
}