import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import products from './data/productData.js'
import Product from './models/productModel.js'
import connectDB from './config/db.js'


dotenv.config()

await connectDB()


const importData = async () => {
    try {
        await Product.deleteMany()

        const 
    } catch (error) {
        
    }
}