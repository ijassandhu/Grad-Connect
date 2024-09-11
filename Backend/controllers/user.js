import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { matchedData, validationResult } from "express-validator";
import User from "../models/user.js";
import customError, {
  errorResponse,
  successfulResponse,
  validationErrorResponse,
} from "../utils/response.js";
import { userFilter } from "../utils/fetchedDataFilters.js";

export const RegisterUser = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const data = matchedData(req);
      data.password = await hash(data.password, 10);
      let user = (await User.create(data)).toObject();
      successfulResponse(
        res,
        201,
        "User registered Successfully",
        userFilter(user),
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { email, password } = matchedData(req);
      let user = await User.findOne({ email }).select("+password").lean();
      if (!user) throw new customError("Invalid Credential", 404);
      if (!(await compare(password, user.password)))
        throw new customError("Invalid Credential", 401);
      successfulResponse(
        res,
        200,
        "User logined Successfully",
        userFilter(user),
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};

export const getUserAuth = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      let user = await User.findById(
        jwt.verify(matchedData(req).id, process.env.authSecret),
      ).lean();
      if (!user) throw new customError("No user registered", 404);
      successfulResponse(
        res,
        200,
        "Fetched User Successfully",
        userFilter(user),
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};

export const updateUser = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { id, ...data } = matchedData(req);
      let user = await User.findByIdAndUpdate(
        jwt.verify(id, process.env.authSecret),
        data,
        { new: true },
      ).lean();
      if (!user) throw new customError("No user registered", 404);
      successfulResponse(
        res,
        200,
        "User Updated Successfullty",
        userFilter(user),
      );
      // console.log(userFilter(user))
      // console.log(data);
    } else validationErrorResponse(res, error.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};

//post
//add experience
//add education institution
