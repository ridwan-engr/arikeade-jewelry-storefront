import Product from '../models/Product.js';

const clean = (body) => ({
  sku: String(body.sku || '').trim().toUpperCase(),
  name: String(body.name || '').trim(),
  category: String(body.category || '').trim(),
  price: Number(body.price),
  salePrice: Number(body.salePrice || 0),
  stock: Number(body.stock),
  material: String(body.material || '').trim(),
  rating: Number(body.rating ?? 5),
  size: String(body.size || '').trim(),
  description: String(body.description || '').trim(),
  image: String(body.image || '').trim(),
  gallery: Array.isArray(body.gallery) ? body.gallery.filter(Boolean).map(String).slice(0, 8) : [],
  featured: Boolean(body.featured),
  newArrival: Boolean(body.newArrival),
  sale: Boolean(body.sale),
  active: body.active !== false,
  theme: String(body.theme || '')
});

export async function listProducts(req, res) {
  const { category, search, includeHidden } = req.query;
  const query = {};
  if (includeHidden !== 'true') query.active = true;
  if (category && category !== 'All') query.category = category;
  if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { sku: { $regex: search, $options: 'i' } }, { material: { $regex: search, $options: 'i' } }];
  const products = await Product.find(query).sort({ createdAt: -1 }).lean();
  res.json({ products: products.map((p) => ({ ...p, id: p.sku })) });
}

export async function getProduct(req, res) {
  const product = await Product.findOne({ sku: req.params.sku }).lean();
  if (!product || (!product.active && req.query.includeHidden !== 'true')) return res.status(404).json({ message: 'Product not found.' });
  res.json({ product: { ...product, id: product.sku } });
}

export async function createProduct(req, res) {
  const data = clean(req.body);
  if (!data.sku || !data.name || !data.category || !Number.isFinite(data.price) || !Number.isFinite(data.stock) || !data.material || !data.description || !data.image) return res.status(400).json({ message: 'SKU, name, category, price, stock, material, description and image are required.' });
  if (data.salePrice && data.salePrice >= data.price) return res.status(400).json({ message: 'Sale price must be lower than regular price.' });
  const product = await Product.create(data);
  res.status(201).json({ product: { ...product.toObject(), id: product.sku } });
}

export async function updateProduct(req, res) {
  const data = clean(req.body);
  if (data.salePrice && data.salePrice >= data.price) return res.status(400).json({ message: 'Sale price must be lower than regular price.' });
  const product = await Product.findOneAndUpdate({ sku: req.params.sku }, data, { new: true, runValidators: true }).lean();
  if (!product) return res.status(404).json({ message: 'Product not found.' });
  res.json({ product: { ...product, id: product.sku } });
}

export async function deleteProduct(req, res) {
  const product = await Product.findOneAndDelete({ sku: req.params.sku });
  if (!product) return res.status(404).json({ message: 'Product not found.' });
  res.json({ message: 'Product deleted.' });
}

export async function setProductStatus(req, res) {
  const product = await Product.findOneAndUpdate({ sku: req.params.sku }, { active: Boolean(req.body.active) }, { new: true }).lean();
  if (!product) return res.status(404).json({ message: 'Product not found.' });
  res.json({ product: { ...product, id: product.sku } });
}
