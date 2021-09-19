import express from 'express'
const router = express.Router()
import { 
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} from '../controllers/productController.js'

import { protect, admin } from '../middleware/authMiddleware.js'
import upload from '../utilis/multer.js'


router
    .route('/')
    .get(getProducts)
router.route('/uploads').post(protect, upload.single('image'), admin, createProduct);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct);

export default router;