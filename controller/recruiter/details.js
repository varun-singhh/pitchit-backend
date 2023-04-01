import mongoose from "mongoose";
import recruterDetails from "../../models/recruiter/details.js";

export const getRecruiterDetails = async (req, res) => {
  try {
    const recruterDetail = await recruterDetails
      .findOne({
        user: mongoose.Types.ObjectId(req.user),
      })
      .populate("user")
      .populate("jobsPosted");
    return res.status(200).json(recruterDetail);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
