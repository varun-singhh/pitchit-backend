import express from "express";
import { getRecruiterDetails } from "../../controller/recruiter/details.js";
import { postJob, upload } from "../../controller/recruiter/jobs.js";
import {
  getRecruiterNotifications,
  markNotificationAsRead,
} from "../../controller/recruiter/notification.js";
import { recruiterAuthenticated } from "../../middleware/recruiterAuth.js";

const router = express.Router();

router.get("/recruiter/details", recruiterAuthenticated, getRecruiterDetails);
router.get(
  "/recruiter/notifications",
  recruiterAuthenticated,
  getRecruiterNotifications
);
router.put(
  "/recruiter/notifications/:id",
  markNotificationAsRead,
  getRecruiterNotifications
);
router.post(
  "/recruiter/jd",
  recruiterAuthenticated,
  upload.single("jd"),
  postJob
);
export default router;

// RECRUITER ROUTES

// router.get('/recruiter/notifications')
// router.post('/recruiter/jobs/jd')
// router.delete('recruiter/jobs/delete')
// router.put('recruiter/jobs/update')

// router.get(`/recruiter/jobs/${userid}/status`)
// router.put(`/recruiter/jobs/${userid}/status/update`)
