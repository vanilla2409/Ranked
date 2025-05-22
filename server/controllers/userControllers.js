import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(409).json({ message: 'Username or email already exists.' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const user = new User({ username, email, hashedPassword, verificationToken });
  await user.save();
  // Here we would send a verification email with the token
  res.status(201).json({ message: 'User created successfully. Please verify your email.' });
};

export const login = async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {
    return res.status(400).json({ message: 'Username/email and password are required.' });
  }
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  if (!user.isVerified) {
    return res.status(403).json({ message: 'Please verify your email before logging in.' });
  }
  const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
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

  // Here we would send a reset email with the token
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
