import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'


//ENV Access
dotenv.config()

//DB Connect
connectDB()

const app = express()

//Body Parse MW
app.use(express.json())

//Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

//Making Uploads Static folder
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname,'/uploads')))

//Build
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname,'frontend', 'build', 'index.html'))
    )
}else{
    app.get('/', (req,res) => {
        res.send('API Running..')
    })
}

//Middlewares
app.use(notFound)
app.use(errorHandler)

//PORT & Listen
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold));