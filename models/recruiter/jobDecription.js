import mongoose from "mongoose";
const jobDescSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attachment: {
      type: String,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "Recruiter",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("JobDescription", jobDescSchema);
