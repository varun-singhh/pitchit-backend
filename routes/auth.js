import express from 'express';
import { signup, login } from '../controller/auth.js';
const router = express.Router();

// COMMON ROUTES
router.post('/login', login);
router.post('/signup', signup);
// router.get(`/feeds/${userid}`)

export default router;
