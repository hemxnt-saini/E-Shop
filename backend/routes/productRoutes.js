import express from 'express'
import Product from './../models/productModel.js'
import asyncHandler from 'express-async-handler'

const router = express.Router()


//Fetch All Products
//GET /api/products PUBLIC
router.get('/', asyncHandler(async(req,res) => {
    const products = await Product.find({})
    res.json(products)
}))



//Fetch Product by ID
//GET /api/products/ID PUBLIC
router.get('/:id', asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        // res.status(404).send({message:"Product Not Found"})
        res.status(404)
        throw new Error("Product not found")
    }

}))

export default router