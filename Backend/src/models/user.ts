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
  profilePic: String,
  location: String,

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "posts",
    },
  ],

  educationalInstitutions: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "institutions",
      },
      courses: [
        {
          name: {
            type: String,
            required: true,
          },
          verifed: {
            type: Boolean,
            default: false,
          },
          completionYear: {
            type: Number,
            min: 1900,
          },
        },
      ],
      isAlumni: {
        type: Boolean,
        default: false,
      },
    },
  ],

  experience: [
    {
      companyId: {
        type: Schema.Types.ObjectId,
        ref: "companies",
      },
      jobTitle: {
        type: String,
        required: true,
      },
      field: String,
      joiningDate: {
        type: Date,
        required: true,
      },
      endDate: Date,
      description: String,
    },
  ],
});

export default model("users", schema);
