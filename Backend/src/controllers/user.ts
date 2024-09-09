import { Request, Response } from "express";

export const RegisterUser = (req: Request, res: Response) => {
  res.status(200).json({
    success: false,
    message: "This is just a demo function post",
  });
};
export const getUser = (req: Request, res: Response) => {
  res.status(200).json({
    success: false,
    message: "This is just a demo function get",
  });
};
export const updateUser = (req: Request, res: Response) => {
  res.status(200).json({
    success: false,
    message: "This is just a demo function put",
  });
};
