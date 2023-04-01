import mongoose from "mongoose";
import multer from "multer";
import { v4 } from "uuid";
import path from "path";
import jobDecription from "../../models/recruiter/jobDecription.js";
import notification from "../../models/recruiter/notification.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, v4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [".docx", ".doc", ".pdf"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, true);
  }
};

export const upload = multer({ storage, fileFilter });

export const postJob = async (req, res) => {
  const { id, title, description } = req.body;
  const attachment = req.file.fileName;
  try {
    const isJobIdPresent = await jobDecription.findOne({
      id,
    });
    if (isJobIdPresent != null) {
      return res.status(400).json({ message: "job id already present" });
    }
    await jobDecription.create({
      id,
      title,
      description,
      attachment,
      isOpen: true,
      postedBy: mongoose.Types.ObjectId(req.user),
    });
    const jobDetail = await jobDecription
      .findOne({
        id,
      })
      .populate("postedBy");

    await notification.create({
      user: mongoose.Types.ObjectId(req.user),
      message: `Job posted | Job id:${id}, Job title:${title}`,
    });
    return res.status(200).json({
      message: "jd uploaded successfully",
      result: jobDetail,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
