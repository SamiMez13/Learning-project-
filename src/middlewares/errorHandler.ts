import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger.js";
import { AppError } from "../errors/AppError.js"
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return
  }

  logger.error({ err }, "Unhandled Error");
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}