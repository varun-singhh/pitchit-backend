import mongoose from "mongoose";
const recruterDetailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
    },
    currentOrg: {
      type: String,
      default: null,
    },
    isHiring: {
      type: Boolean,
      default: true,
    },
    gender: {
      type: String,
      default: null,
    },
    position: {
      type: String,
      default: null,
    },
    jobsPosted: {
      type: Number,
      default: 0,
    },
    hired: {
      type: Number,
      default: 0,
    },
    jobsPosted: [
      { type: mongoose.Schema.Types.ObjectId, ref: "JobDescription" },
    ],
  },
  {
    timeStamps: true,
  }
);

export default mongoose.model("RecruiterDetails", recruterDetailsSchema);
