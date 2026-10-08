import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true, index: true },
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, default: 0, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  material: { type: String, required: true, trim: true },
  rating: { type: Number, default: 5, min: 0, max: 5 },
  size: { type: String, default: '' },
  description: { type: String, required: true },
  image: { type: String, required: true },
  gallery: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  newArrival: { type: Boolean, default: false },
  sale: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  theme: { type: String, default: '' }
}, { timestamps: true, versionKey: false });

productSchema.virtual('effectivePrice').get(function () {
  return this.salePrice > 0 ? this.salePrice : this.price;
});

productSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Product', productSchema);
