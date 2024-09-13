import express from "express";
import { validateId, validateString, validateViewableBy } from "../utils/validation.js";
import { addPost } from "../controllers/posts.js";

const Router = express.Router();

Router.post("/:id", [
  validateString("title"),
  validateString("description"),
  validateString("photoUrl"),
  validateString("modelType", false),
  validateId,
  validateViewableBy,
],addPost);

export default Router;
