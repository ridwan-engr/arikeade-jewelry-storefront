import { Router } from 'express';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct, setProductStatus } from '../controllers/productController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();
router.get('/', listProducts);
router.get('/:sku', getProduct);
router.post('/', requireAdmin, createProduct);
router.put('/:sku', requireAdmin, updateProduct);
router.patch('/:sku/status', requireAdmin, setProductStatus);
router.delete('/:sku', requireAdmin, deleteProduct);
export default router;
