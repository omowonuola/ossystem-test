import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


// @desc 		Create a Product
// @route 		POST /api/v1/products
// @access 		Private/admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		title: req.body.title,
		user: req.user._id,
		image: req.file.image,
		category: req.body.category,
		description: req.body.description,
	});
	const createdProduct = await product.save();

    if (createdProduct) {
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
        res.status(200).json(product)  
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
		res.status(200).json({ message: 'product removed' });
	} else {
		res.status(404);
		throw new Error('Product Not Found');
	}
});



// @desc 		Update a Product
// @route 		PUT /api/v1/products
// @access 		Private/admin
const updateProduct = asyncHandler(async (req, res) => {
	const {
		title,
		description,
		image,
        category
	} = req.body;

	const product = await Product.findById(req.params.id);
	if (product) {
		product.title = title;
		product.description = description;
		product.image = image;
		product.category = category;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('product not found');
	}
});

export {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}