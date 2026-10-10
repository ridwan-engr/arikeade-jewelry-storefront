import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: (origin, callback) => { if (!origin || env.frontendOrigins.includes(origin)) return callback(null, true); return callback(new Error('CORS origin denied')); }, credentials: false }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use('/api/auth/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false }));
app.get('/api/health', (_req,res) => res.json({ ok:true, service:'arikeade-jewelry-api', environment:env.nodeEnv }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/uploads', uploadRoutes);
app.use((err,_req,res,_next) => { console.error(err); res.status(err.status || 500).json({ message: env.nodeEnv === 'production' ? 'Server error.' : err.message }); });

connectDatabase().then(() => app.listen(env.port, () => console.log(`Arikeade API listening on http://localhost:${env.port}`))).catch((err) => { console.error('Startup failed:', err.message); process.exit(1); });
