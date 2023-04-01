import chalk from "chalk";
import { v4 } from "uuid";
import mongoose from "mongoose";
import UserPitch from "../../models/user/pitch.js";

export const uploadPitch = async (req, res) => {
  try {
    const { pitch, caption, tags } = req.body;
    if (!pitch) {
      res.status(400).json("missing field: pitch video ");
    }
    const pitchResponse = await UserPitch.create({
      id: v4(),
      user: mongoose.Types.ObjectId(req.user),
      pitch,
      caption,
      tags,
    });
    return res.status(200).json({
      status: "SUCCESS",
      code: "200",
      data: pitchResponse,
    });
  } catch {
    console.log(chalk.redBright(error.message));
    return res.status(500).json({
      status: "FAILURE",
      code: "500",
      message: "internal server error",
    });
  }
};

export const editPitch = async (req, res) => {
  try {
    const { pitch, caption, tags } = req.body;
    const { id } = req.params;
    if (!pitch) {
      res.status(400).json({
        status: "FAILURE",
        code: "400",
        message: "missing field: pitch video ",
      });
    }

    const pitchDetails = await UserPitch.findOneAndUpdate(
      { id: id },
      {
        pitch,
        caption,
        tags,
      },
      {
        new: true,
      }
    );

    if (!pitchDetails) {
      return res.status(404).json({
        status: "FAILURE",
        code: "404",
        message: "pitch not found, invalid id",
      });
    }

    return res.status(200).json({
      status: "SUCCESS",
      code: "200",
      data: pitchDetails,
    });
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).json({
      status: "FAILURE",
      code: "500",
      message: "internal server error",
    });
  }
};

export const pitchReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { isLiked } = req.query;

    const pitchDetails = UserPitch.findOne({ id });
    console.log(pitchDetails);
    if (isLiked) {
      await UserPitch.findOneAndUpdate(
        { id },
        { likes: pitchDetails.likes + 1 }
      );
      return res.status(200).json({
        status: "SUCCESS",
        code: "200",
        message: "pitch liked",
      });
    }
    await UserPitch.findOneAndUpdate({ id }, { likes: pitchDetails.likes - 1 });
    return res.status(200).json({
      status: "SUCCESS",
      code: "200",
      message: "pitch disliked",
    });
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).json({
      status: "FAILURE",
      code: "500",
      message: "internal server error",
    });
  }
};
