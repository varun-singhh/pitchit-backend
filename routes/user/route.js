import express from "express";
import { getUserDetails } from "../../controller/user/details.js";
import { userAuthenticated } from "../../middleware/userAuth.js";
import { uploadPitch,editPitch,pitchReaction } from "../../controller/user/pitch.js";
const router = express.Router();

router.get("/user/details", userAuthenticated, getUserDetails);
router.post('/user/pitch', userAuthenticated, uploadPitch)
router.put('/user/pitch/:id', userAuthenticated, editPitch)
router.patch('/user/pitch/:id', userAuthenticated, pitchReaction)

// router.get(`/feeds/${userid}`)

export default router;

// USER ROUTER
// router.get('/user',auth, getUserDetails)
// router.get('/user/jobs/applied/status')
// router.get('/user/notifications')

// router.post('/user/upload/video')
// router.post('/user/upload/resume')
// router.post('/user/jobs/apply')
// router.put('/user')
