import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc 		Create a Product
// @route 		POST /api/v1/products
// @access 		Private/admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: req.body.name,
		user: req.user._id,
		image: req.file.image,
		category: req.body.category,
		description: req.body.description,
	});
	const createdProduct = await product.save();

    if (createProduct) {
        res.status(201).json(createdProduct);
    } else {
        res.status(500)
        throw new Error('Product cannot be created')
    }
	
});



// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})

    if (products) {
        res.json(products)  
    } else {
        res.status(404)
        throw new Error('Products not found')
    }
})


// @desc    Fetch single product
// @route   GET /api/products/id
// @access  Public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
        res.json(product)  
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})


// @desc 		Delete a Product
// @route 		DELETE /api/v1/products/:id
// @access 		Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		await product.remove();
		res.json({ message: 'product removed' });
	} else {
		res.status(404);
		throw new Error('Product Not Found');
	}
});

export {
    getProducts,
    getProductById
}