import express from 'express';
import { signup, login, verifyEmail, forgotPassword, resetPassword, logout } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', auth, (req, res) => {
  // Return user info from the decoded JWT
  res.json({
    success: true,
    user: {
      userId: req.user.userId,
      username: req.user.username,
    }
  });
});

export default router;
