import mongoose from "mongoose";
import recruiterNotification from "../../models/recruiter/notification.js";

export const getRecruiterNotifications = async (req, res) => {
  try {
    const notif = await recruiterNotification.findOne({
      user: mongoose.Types.ObjectId(req.user),
    });
    return res.status(200).json(notif);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await recruiterNotification.findOne({
      user: mongoose.Types.ObjectId(req.user),
    });
    return res.status(200).json(notif);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
