import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';

export async function login(req, res) {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });
  const user = await User.findOne({ email });
  if (!user || !user.active || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }
  const token = jwt.sign({ role: user.role }, env.jwtSecret, { subject: user._id.toString(), expiresIn: env.jwtExpiresIn });
  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
}

export function me(req, res) {
  res.json({ user: req.user });
}
