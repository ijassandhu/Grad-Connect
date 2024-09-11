import { Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

export default class customError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const successfulResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: Object,
) => {
  res.status(statusCode).json({ success: true, message, data });
};

export const errorResponse = (
  res: Response,
  error: any,
  status: number | undefined,
) => {
  console.log(error);
  console.log("-----------------------------------------------------");
  if (error instanceof JsonWebTokenError) status = 400;
  res.status(status || 500).json({
    success: false,
    message: error.message || "INTERNAL SERVER ERROR",
    name: error.name || "server",
  });
};

export const validationErrorResponse = (res: Response, errors: Object[]) => {
  res.status(400).json({
    success: false,
    errors,
  });
};
