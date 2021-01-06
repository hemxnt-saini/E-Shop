import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'


//ENV Access
dotenv.config()

//DB Connect
connectDB()

const app = express()
//Body Parse MW
app.use(express.json())

//Home Route
app.get('/', (req,res) => {
    res.send('API Running..')
})

//Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

//Middlewares
app.use(notFound)
app.use(errorHandler)

//PORT & Listen
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold));