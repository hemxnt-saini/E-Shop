import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

const app = express();

//ENV Access
dotenv.config()

//DB Connect
connectDB()

//Home Route
app.get('/', (req,res) => {
    res.send('API Running..')
})

//Routes
app.use('/api/products', productRoutes)

//Middlewares
app.use(notFound)
app.use(errorHandler)

//PORT & Listen
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold));