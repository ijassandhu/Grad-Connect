import { matchedData, validationResult } from "express-validator";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import EduInstitutions from "../models/educationalIntitutions.js";
import customError, {
  errorResponse,
  successfulResponse,
  validationErrorResponse,
} from "../utils/response.js";
import { eduInstitutionFilter } from "../utils/fetchedDataFilters.js";
import educationalIntitutions from "../models/educationalIntitutions.js";
import User from "../models/user.js";

export const registerEduInstitution = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      let data = matchedData(req);
      data.password = await hash(data.password, 10);
      let eduInstitution = (await EduInstitutions.create(data)).toObject();
      successfulResponse(
        res,
        201,
        "Educational Institution Registered Successfully",
        eduInstitutionFilter(eduInstitution),
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
      let eduInstitution = await EduInstitutions.findOne({ email })
        .select("+password")
        .lean();
      if (!eduInstitution) throw new customError("Invalid Credentials", 401);
      if (!(await compare(password, eduInstitution.password)))
        new customError("Invaid Credentials", 401);
      successfulResponse(
        res,
        200,
        "Educational Institution Logined Successfully",
        eduInstitutionFilter(eduInstitution),
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};

export const getEduInstitutionAuth = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      let eduInstitution = await EduInstitutions.findById(
        jwt.verify(matchedData(req).id, process.env.authSecret),
      ).lean();
      if (!eduInstitution)
        throw new customError("No Registered Educational Institution", 401);
      successfulResponse(
        res,
        200,
        "Fetched Educational Instittution",
        eduInstitutionFilter(eduInstitution),
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};

export const updateEduInstitution = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { id, ...data } = matchedData(req);
      let eduInstitution = await educationalIntitutions
        .findByIdAndUpdate(jwt.verify(id, process.env.authSecret), data, {
          new: true,
        })
        .lean();
      if (!eduInstitution)
        throw customError("No Registered Educational Institution", 401);
      successfulResponse(
        res,
        200,
        "Updated Educational Institution",
        eduInstitutionFilter(eduInstitution),
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};

export const addStudents = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { id, students } = matchedData(req);
      const studentsId = students.map((id) =>
        jwt.verify(id, process.env.viewSecret),
      );
      let existingUsersId = (
        await User.find({ _id: { $in: studentsId } }).lean()
      ).map((user) => user._id.toString());
      console.log(existingUsersId);
      console.log(studentsId);
      const invalidUsers = studentsId
        .map((studentId, index) => {
          if (!existingUsersId.includes(studentId._id)) return students[index];
          return undefined;
        })
        .filter((element) => element);
      if (invalidUsers.length)
        throw new customError("Invalid Users", 400, { invalidUsers });
      let eduInstitution = await EduInstitutions.findByIdAndUpdate(
        jwt.verify(id, process.env.authSecret),
        { $addToSet: { students: studentsId } },
        {new: true}
      );
      if (!eduInstitution)
        throw new customError("No Registered Educational Institution", 404);
      successfulResponse(
        res,
        200,
        "Updated Educational Institution",
        eduInstitutionFilter(eduInstitution),
      );
    } else validationErrorResponse(res, result.array());
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};

export const addAlumnis = async (req, res) => {
  try {
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { id, alumnis } = matchedData(req);
      const alumnisId = alumnis.map((id) =>
        jwt.verify(id, process.env.viewSecret),
      );
      let existingUsersId = (
        await User.find({ _id: { $in: alumnisId } }).lean()
      ).map((user) => user._id.toString());
      const invalidUsers = alumnisId.map((alumniId, index) => {
        if (!existingUsersId.includes(alumniId)) return alumnis[index];
        return undefined;
      });
      if (invalidUsers.length)
        throw new customError("Invalid Users", 400, { invalidUsers });
      let eduInstitution = await EduInstitutions.findByIdAndUpdate(
        jwt.verify(id, process.env.authSecret),
        { $addToSet: { alumnis: alumnisId } },
        {new: true}
      );
      if (!eduInstitution)
        throw new customError("No Registered Educational Institution", 404);
      successfulResponse(
        res,
        200,
        "Updated Educational Institution",
        eduInstitutionFilter(eduInstitution),
      );
    } else validationErrorResponse(res, result.array());
    res.status(200).json({
      success: true,
      message: "test function",
    });
  } catch (error) {
    errorResponse(res, error, error.status);
  }
};
