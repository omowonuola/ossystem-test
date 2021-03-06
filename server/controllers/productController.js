import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import cloudinary from '../utilis/cloudinary.js'

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Product Routes
 * 
*/



/**
 * @swagger
 * /api/products/uploads:
 *   post:
 *     description: Create New Product Route
 *     tags: [Products]
 *     parameters:
 *     - name: title
 *       description: product title
 *       in: formData
 *       required: true
 *       type: string
 *     - name: category
 *       description: product category
 *       in: formData
 *       required: true
 *       type: string
 *     - name: description
 *       description: product description
 *       in: formData
 *       required: true
 *       type: string
 *     - name: image
 *       description: product image
 *       in: path
 *       required: true
 *       type: file
 *     responses:
 *       200:
 *         description: Returns created product details.
 *       400:
 *          description: Product cannot be created
*/


const createProduct = asyncHandler(async (req, res) => {

	try {
		const uploadimage = await cloudinary.v2.uploader.upload(req.file.path);

		const product = new Product({
			title: req.body.title,
			user: req.user._id,
			image: uploadimage.secure_url,
			category: req.body.category,
			description: req.body.description,
		});
		const createdProduct = await product.save();

		if (createdProduct) {
			res.status(201).json(createdProduct);
		}
	} catch (error) {
		res.status(500)
        throw new Error('Product cannot be created')
	}
	
});




/**
 * @swagger
 * /api/products/?keyword=${keyword}&pageNumber=${pageNumber}:
 *   get:
 *     description: Get All Products Route
 *     tags: [Products]
 *     parameters:
 *     - name: title
 *       description: product title
 *       in: formData
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: Returns new product.
 *       400:
 *          description: product not found
*/

const getProducts = asyncHandler(async(req, res) => {

    const pageSize = 8;
	const page = Number(req.query.pageNumber) || 1;
	const keyword = req.query.keyword
		? {
				title: {
					$regex: req.query.keyword,
					$options: 'i',
				},
		  }
		: {};

	try {
		const count = await Product.countDocuments({ ...keyword });
		const products = await Product.find({ ...keyword })
	
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	res.json({ products, page, pages: Math.ceil(count / pageSize) });
	} catch (error) {
		res.status(500)
        throw new Error('Products not found')
	}
	
})


/**
 * @swagger
 * /api/products/:id:
 *   get:
 *     description: Get Single Product Route
 *     tags: [Products]
 *     parameters:
 *     - name: id
 *       description: product id
 *       in: path
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: Returns product.
 *       400:
 *          description: product not found
*/

const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
        res.status(200).json(product)  
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})



/**
 * @swagger
 * /api/products/:id:
 *   delete:
 *     description: delete Single Product Route
 *     tags: [Products]
 *     parameters:
 *     - name: id
 *       description: product id
 *       in: path
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: deletes product.
 *       400:
 *          description: product not found
*/

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




/**
 * @swagger
 * /api/products/:id:
 *   put:
 *     description: update Single Product Route
 *     tags: [Products]
 *     parameters:
 *     - name: id
 *       description: product id
 *       in: path
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: Returns new product.
 *       400:
 *          description: product not found
*/

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