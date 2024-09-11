import { matchedData, validationResult } from "express-validator";
import EduInstitution from "../models/educationalIntitutions.js";
import { compare, hash } from "bcrypt";
import customError, {
  errorResponse,
  successfulResponse,
  validationErrorResponse,
} from "../utils/response.js";
import { eduInstitutionFilter } from "../utils/fetchedDataFilters.js";

export const registerEduInstitution = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      let data = matchedData(req);
      data.password = await hash(data.password, 10);
      let eduInstitution = (await EduInstitution.create(data)).toObject();
      successfulResponse(
        res,
        201,
        "Educational Institution Registered Successfully",
        eduInstitutionFilter(eduInstitution)
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};

export const loginEduInstitution = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { email, password } = matchedData(req);
      let eduInstitution = await EduInstitution.findOne({ email }).lean();
      if (!eduInstitution) throw new customError("Invalid Credentials", 401);
      if (!(await compare(password, eduInstitution.password)))
        new customError("Invaid Credentials", 401);
      successfulResponse(
        res,
        200,
        "Educational Institution Logined Successfully",
        eduInstitutionFilter(eduInstitution)
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};
