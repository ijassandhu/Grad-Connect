import { model, Schema } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
  },
  description: String,
  photoUrl: String,
  comments: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  modelType: {
    type: String,
    required: true,
    enum: ["users", "eduInstitutions"],
  },
  referenceId: {
    type: Schema.Types.ObjectId,
    refPath: "modelType",
  },
  viewableBy: {
    type: Number,
    min: 1,
    max: 3,
    default: 3,
  },
});

export default model("posts", schema);
