import Product from './../models/productModel.js'
import asyncHandler from 'express-async-handler'    


//Fetch All Products
//GET /api/products PUBLIC
const getProducts = asyncHandler(async (req,res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,  //Anyword related search
            $options:'i'                //Case Insensitive
        }
    } : {}

    const products = await Product.find({...keyword})
    res.json(products)
})

//Fetch Product by ID
//GET /api/products/ID PUBLIC
const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        // res.status(404).send({message:"Product Not Found"})
        res.status(404)
        throw new Error("Product not found")
    }
})

//DELETE Product by ID
//DELETE /api/products/ID PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({message: "Product deleted"})
    }else{
        // res.status(404).send({message:"Product Not Found"})
        res.status(404)
        throw new Error("Product not found")
    }
})

//POST Create A Product
//POST /api/products PRIVATE/ADMIN
const createProduct = asyncHandler(async (req,res) => {
    const product = new Product({
        name:'Sample Name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample Brand',
        category:'Sample Category',
        countInStock:0,
        numReviews:0,
        description:'Sample Description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

//PUT Update A Product
//PUT /api/products/:ID PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req,res) => {
    
    const {name,price,image,brand,category,countInStock,description} = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)    
    } else {
       res.status(404)
       throw new Error('Product not found') 
    }

})

//POST Review A Product
//POST /api/products/:ID/reviews PRIVATE
const createProductReview = asyncHandler(async (req,res) => {
    
    const {rating, comment} = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
       
        const alreadyReviewd = product.reviews.find(r => r.user.toString() === req.user._id.toString())

        if(alreadyReviewd){
            res.status(400)
            throw new Error('Product already reviewd')
        }

        const review= {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews= product.reviews.length
        product.rating = product.reviews.reduce((acc,item) => acc + item.rating,0)/product.reviews.length

        await product.save()
        res.status(201).json({message:'Review added'})

    } else {
       res.status(404)
       throw new Error('Product not found') 
    }

})

export {getProducts,getProductById, deleteProduct,createProduct,updateProduct, createProductReview}