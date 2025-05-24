import express from 'express';
import { signup, login, verifyEmail, forgotPassword, resetPassword } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', auth, (req, res) => {
  // Return user info from the decoded JWT
  res.json({
    userId: req.user.userId,
    username: req.user.username
    // Add more fields if you include them in the JWT
  });
});

export default router;
