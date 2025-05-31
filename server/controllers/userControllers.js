import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { findUserByUsernameOrEmail, createNewUser } from '../helpers/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  const existingUser = await findUserByUsernameOrEmail(username, email);
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Username or email already exists.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const user = await createNewUser(username, email, hashedPassword, verificationToken);
  if (!user) {
    return res.status(500).json({ success: false, message: 'Error creating user.' });
  }

  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Strict',
  });
  // Here we would send a verification email with the token
  res.status(201).json({ success: true, message: 'User created successfully. Please login to continue' });
};

export const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  if ((!usernameOrEmail) || !password) {
    return res.status(400).json({ message: 'Username/email and password are required.' });
  }

  const user = await findUserByUsernameOrEmail(usernameOrEmail, usernameOrEmail);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  bcrypt.compare(password, user.passwordHash, async (err, isMatch) => {
    if (err) {
      console.error('Error comparing passwords:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    if (!isMatch) {
      console.warn('Invalid password attempt for user:', user.username);
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Strict',
    });
    res.json({ 
      success: true,
      message: 'Login successful.',
      user: { userId: user.id, username: user.username },
    })
  }
  );
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ verificationToken: token });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token.' });
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  res.json({ message: 'Email verified successfully.' });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found.' });
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // TO-Do --> Here we would send a reset email with the token
  res.json({ message: 'Password reset link sent to your email.' });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token.' });
  user.hashedPassword = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  res.json({ message: 'Password reset successful.' });
};

export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Strict',
  });
  res.json({ success: true, message: 'Logged out successfully.' });
}
