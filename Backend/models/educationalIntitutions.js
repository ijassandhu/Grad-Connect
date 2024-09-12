import { model, Schema } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  location: String,
  profilePic: String,
  about: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  ],
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  alumnis: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

export default model("eduInstitutions", schema);
