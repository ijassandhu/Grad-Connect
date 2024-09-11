import { Request, Response } from "express";
import { hash } from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { matchedData, validationResult } from "express-validator";
import User from "../models/user.ts";
import customError, {
  errorResponse,
  successfulResponse,
  validationErrorResponse,
} from "../utils/response.ts";

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      data.password = await hash(data.password, 10);
      let user = await User.create(data);
      (user._id as unknown as string) = jwt.sign(
        { _id: user["_id"] },
        process.env.authSecret!,
      );
      successfulResponse(res, 201, "User registered Successfully", user);
      // res.status(201).json({
      //   success: true,
      //   message: "Registered User Successfully",
      //   user,
      // });
    } else validationErrorResponse(res, result.array());
    // res.status(400).json({
    //   success: false,
    //   message: "This is just a demo function post",
    //   error: result.array(),
    // });
  } catch (error: any) {
    errorResponse(res, error, error.status || undefined);
  }
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
