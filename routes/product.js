import { Router } from 'express';
const router = Router();
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,filterProducts,
} from '../Controllers/product.js';
import protect from "../middlewares/authMiddleware.js"
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

router.post('/add_product', upload.array('images', 5), addProduct);
router.get('/allproducts', getAllProducts);
router.get('/product/:productId', getSingleProduct);
router.put('/product/update/:productId',protect, updateProduct);
router.delete('/product/delete/:productId', deleteProduct);
router.post('/filterproducts', protect, filterProducts)


const productRouters = router;

export default productRouters;
