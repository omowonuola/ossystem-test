import express from 'express';
import path from "path";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import colors from 'colors'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(cors());
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)


// app.use(notFound)
app.use(errorHandler)

// const __dirname = path.resolve();
// app.use("/", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 8081


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Os-System Test',
            description: 'The test application for os-system',
            contact: {
                name: 'Os-System'
            },
            servers: ['http://localhost:8081']
        }
    },

    // 
    apis: ['./controllers/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(
    PORT, 
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)