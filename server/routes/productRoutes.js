import express from 'express'
const router = express.Router()
import { 
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} from '../controllers/productController.js'

import protect from '../middleware/authMiddleware.js'


router.route('/').get(getProducts).post(protect, createProduct);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, deleteProduct)
	.put(protect, updateProduct);

export default router