import Order from './../models/orderModel.js'
import asyncHandler from 'express-async-handler'    

//Create new Order
//POST /api/orders
//PRIVATE

const addOrderItems = asyncHandler(async (req,res) => {
  
    const {orderItems,shippingPrice,taxPrice,itemsPrice,totalPrice,shippingAddress,paymentMethod } = req.body

   if(orderItems && orderItems.length === 0){
       res.status(400)
       throw new Error('No order items')
       return
   }else{
       const order = new Order({
        user:req.user._id,
        orderItems,
        shippingPrice,
        taxPrice,
        itemsPrice,
        totalPrice,
        shippingAddress,
        paymentMethod 
       })

       const createdOrder = await order.save()
       res.status(201).json(createdOrder)
    }

})

export {addOrderItems}