import chalk from "chalk";
import mongoose from "mongoose";
import userDetails from "../../models/user/details.js";

export const getUserDetails = async (req, res) => {
  try {
    const userDetail = await userDetails
      .findOne({
        user: mongoose.Types.ObjectId(req.user),
      })
      .populate("user");
    if (userDetail == undefined) {
      res.status(404).json({ message: error.message });
    }
    res.status(200).json(userDetail);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    res.status(500).json("internal server error ");
  }
};