import 'dotenv/config';

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export const env = {
  port: Number(process.env.PORT || 5000),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: required('MONGODB_URI'),
  jwtSecret: required('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@arikeadejewelry.com',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  frontendOrigins: (process.env.FRONTEND_ORIGIN || 'http://localhost:5500').split(',').map((x) => x.trim()).filter(Boolean)
};
