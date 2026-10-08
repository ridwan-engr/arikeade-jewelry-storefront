import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';

export async function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Admin authentication required.' });
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub).lean();
    if (!user || !user.active || user.role !== 'admin') return res.status(401).json({ message: 'Admin access denied.' });
    req.user = { id: user._id.toString(), email: user.email, role: user.role };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired admin token.' });
  }
}
