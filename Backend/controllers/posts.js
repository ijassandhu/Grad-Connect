import Users from "../models/user.js";
import Posts from "../models/posts.js";
import jwt from "jsonwebtoken";
import { matchedData, validationResult } from "express-validator";
import customError, {
  errorResponse,
  successfulResponse,
  validationErrorResponse,
} from "../utils/response.js";
import { postFilter } from "../utils/fetchedDataFilters.js";

export const addPost = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      let { id, ...data } = matchedData(req);
      id = jwt.verify(id, process.env.authSecret);
      const user = await Users.findById(id).lean();
      if (!user) throw new customError("No User Registered", 404);
      data.referenceId = id;
      let post = (await Posts.create(data)).toObject();
      successfulResponse(
        res,
        201,
        "Post created successfully",
        postFilter(post),
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};
