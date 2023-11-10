import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const ErrorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res
      .status(400)
      .json({ success: false, error: error.flatten().fieldErrors });
  }

  const statusCode = error.statusCode ?? 500;
  res.status(statusCode).json({
    success: false,
    error: error.message,
  });
};

export default ErrorMiddleware
