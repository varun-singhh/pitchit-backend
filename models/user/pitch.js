import mongoose from "mongoose";
const pitchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    id: {
      type: String
    },
    pitch: {
      type: String,
      required: true,
    },
    caption: {
        type: String,
    },
    tags: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    recruiterReachCount: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserPitch", pitchSchema);
