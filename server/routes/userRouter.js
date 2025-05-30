import express from 'express';
import { signup, login, verifyEmail, forgotPassword, resetPassword, logout } from '../controllers/userControllers.js';
import auth from '../middleware/auth.js';
import { getUserRank, getUserRating } from '../helpers/leaderboard.js';
import { getMatchesPlayedAndWon } from '../helpers/db.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/profile', auth, async(req, res) => {
  // Return user info from the decoded JWT
  const {matchesPlayed, matchesWon } = await getMatchesPlayedAndWon(req.user.username);
  res.json({
    success: true,
    user: {
      rank: await getUserRank(req.user.username),
      userId: req.user.userId,
      username: req.user.username,
      elo: await getUserRating(req.user.username)
    },
    matchesPlayed,
    matchesWon,
  });
});

export default router;
