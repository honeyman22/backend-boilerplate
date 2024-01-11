import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/HttpException";

const errorMiddleware = (
  error: HttpException | unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: false,
    message: "Internal Server Error",
  });
};

export default errorMiddleware;
