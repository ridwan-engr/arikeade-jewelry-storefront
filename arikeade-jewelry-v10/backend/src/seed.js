import bcrypt from 'bcryptjs';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import User from './models/User.js';
import Product from './models/Product.js';

const products = [
  ['ARI-001','Gold Pearl Necklace','Necklaces',85000,'18K Gold Plated',12,4.9,'A refined pearl necklace designed for effortless elegance, with a warm gold finish that works from day to evening.','https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85'],
  ['ARI-002','Classic Gold Hoops','Earrings',45000,'18K Gold Plated',8,4.8,'Polished everyday hoops with a balanced silhouette and lightweight feel.','https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85'],
  ['ARI-003','Sculpted Signet Ring','Rings',62000,'Stainless Steel Gold Finish',5,4.7,'A modern signet-inspired ring with a clean sculpted face.','https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85'],
  ['ARI-004','Luna Tennis Bracelet','Bracelets',125000,'Gold Tone + Crystal',4,4.9,'A luminous tennis bracelet designed to catch the light with every movement.','https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85'],
  ['ARI-005','Pearl Drop Earrings','Earrings',55000,'Freshwater Pearl',9,4.6,'Soft pearl drops with a graceful profile for weddings, dinners and special occasions.','https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=85'],
  ['ARI-006','Minimal Gold Chain','Necklaces',72000,'18K Gold Plated',15,4.8,'A versatile fine chain made for layering or wearing alone.','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85'],
  ['ARI-007','Aurelia Cuff','Bracelets',98000,'Gold Plated Brass',6,4.7,'A structured cuff with a softly brushed finish and contemporary lines.','https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85'],
  ['ARI-008','Halo Crystal Ring','Rings',68000,'Gold Tone + Crystal',3,4.9,'A delicate halo silhouette with a luminous centre stone.','https://images.unsplash.com/photo-1603561596112-db6e1e7d3d7a?auto=format&fit=crop&w=900&q=85']
];

await connectDatabase();
const password = env.adminPassword || 'ChangeMe123!';
const passwordHash = await bcrypt.hash(password, 12);
await User.findOneAndUpdate({ email: env.adminEmail }, { email: env.adminEmail, passwordHash, role: 'admin', active: true }, { upsert: true, new: true, setDefaultsOnInsert: true });
for (const [sku,name,category,price,material,stock,rating,description,image] of products) {
  await Product.findOneAndUpdate({ sku }, { sku,name,category,price,salePrice:0,stock,material,rating,description,image,gallery:[image],featured:['ARI-001','ARI-002','ARI-003','ARI-004','ARI-006'].includes(sku),active:true }, { upsert:true, new:true, setDefaultsOnInsert:true });
}
console.log(`Seeded admin ${env.adminEmail} and ${products.length} products.`);
process.exit(0);
