import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utilis/generateToken.js'


/**
 * @swagger
 * tags:
 *  name: Users Auth
 *  description: User Authentication Routes
 * 
*/

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     description: Admin Login Route
 *     tags: [Users Auth]
 *     parameters:
 *     - name: email
 *       description: registered email for a user
 *       in: formData
 *       required: true
 *       type: string
 *     - name: password
 *       description: registered password for a user
 *       in: formData
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Returns user info with token.
 *       400:
 *          description: User not found
*/

const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }

})


/**
 * @swagger
 * /api/users/:
 *   post:
 *     description: User Register Route
 *     tags: [Users Auth]
 *     parameters:
 *     - name: name
 *       description: user name
 *       in: formData
 *       required: true
 *       type: string
 *     - name: email
 *       description: email for a user
 *       in: formData
 *       required: true
 *       type: string
 *     - name: password
 *       description: password for a user
 *       in: formData
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Returns user info with token.
 *       400:
 *          description: invalid user data
*/

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if( userExists ) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('invalid user data')
    }
})



/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     description: Get User Profile Route
 *     tags: [Users Auth]
 *     parameters:
 *     - name: bearer token
 *       description: user bearer token
 *       in: path
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: Returns user info with token.
 *       400:
 *          description: User not found
*/

const getUserProfile = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})




/**
 * @swagger
 * /api/users/:adminid:
 *   put:
 *     description: update user profile route
 *     tags: [Users Auth]
 *     parameters:
 *     - name: id
 *       description: user id
 *       in: path
 *       required: true
 *       type: string
 *     - name: name
 *       description: user name
 *       in: formData
 *       required: false
 *       type: string
 *     - name: email
 *       description: email for a user
 *       in: formData
 *       required: false
 *       type: string
 *     - name: password
 *       description: password for a user
 *       in: formData
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: Returns user info with token.
 *       400:
 *          description: User not found
*/

const updateUserProfile = asyncHandler(async(req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        user.name= req.body.name || user.name
        user.email= req.body.email || user.email
        if(req.body.password){
            user.password=req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})


/**
 * @swagger
 * /api/users/:
 *   get:
 *     description: get users route
 *     tags: [Users Auth]
 *     parameters:
 *     - name: name
 *       description: user name
 *       in: formData
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: Returns user info with token.
 *       400:
 *          description: User not found
*/

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});



/**
 * @swagger
 * /api/users/:id:
 *   delete:
 *     description: delete user profile route
 *     tags: [Users Auth]
 *     parameters:
 *     - name: id
 *       description: user id
 *       in: path
 *       required: true
 *       type: string
 *     - name: name
 *       description: user name
 *       in: formData
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: User Removed
 *       400:
 *          description: User not found
*/

const deleteUsers = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.json({ message: 'User Removed' });
	} else {
		res.status(404);
		throw new Error('User not Found');
	}
});


/**
 * @swagger
 * /api/users/:id:
 *   get:
 *     description: get user profile by id route
 *     tags: [Users Auth]
 *     parameters:
 *     - name: id
 *       description: user id
 *       in: path
 *       required: true
 *       type: string
 *     responses:
 *       200:
 *         description: Returns user info with token.
 *       400:
 *          description: User not found
*/

const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not Found');
	}
});

/**
 * @swagger
 * /api/users/:id:
 *   put:
 *     description: update admin profile route
 *     tags: [Users Auth]
 *     parameters:
 *     - name: id
 *       description: user id
 *       in: path
 *       required: true
 *       type: string
 *     - name: name
 *       description: admin name
 *       in: formData
 *       required: false
 *       type: string
 *     - name: email
 *       description: email for admin
 *       in: formData
 *       required: false
 *       type: string
 *     - name: password
 *       description: password for admin
 *       in: formData
 *       required: false
 *       type: string
 *     responses:
 *       200:
 *         description: Returns user info with token.
 *       400:
 *          description: User not found
*/

const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin || user.isAdmin;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});


export {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
	deleteUsers,
	getUserById,
	updateUser,
}