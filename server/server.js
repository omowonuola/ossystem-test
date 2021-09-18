import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import colors from 'colors'


dotenv.config()

connectDB()

const app = express()
app.use(express.json())





const PORT = process.env.PORT || 8081

app.listen(
    PORT, 
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)