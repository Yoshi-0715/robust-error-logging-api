import { Request, Response, NextFunction } from "express";
import AppError from "./AppError";
import logger from "./logger";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err as AppError;

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  logger.error("API Error", {
    method: req.method,
    url: req.originalUrl,
    statusCode,
    message,
    stack: error.stack,
  });

  const response: {
    success: boolean;
    statusCode: number;
    message: string;
    stack?: string;
  } = {
    success: false,
    statusCode,
    message,
  };

  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;