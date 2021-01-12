import Order from '../models/orderModel.js'
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

//Get OrderByID
//GET /api/orders/:id
//PRIVATE
const getOrderById = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


//Update OrderToPaid
//PUT /api/orders/:id/pay
//PRIVATE
const updateOrderToPaid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true,
        order.paidAt=Date.now()
        order.paymentResult = {
            id: req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.email_address,   
        }
        
    const updatedOrder = await order.save()
    res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


//Update OrderToDelivered
//PUT /api/orders/:id/deliver
//PRIVATE/ADMIN
const updateOrderToDelivered = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true,
        order.deliveredAt=Date.now()
        
        const updatedOrder = await order.save()
        res.json(updatedOrder)
        
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//Get Orders of LoggedIn Users
//GET /api/orders/myorders
//PRIVATE
const getMyOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

//Get All Orders
//GET /api/orders
//PRIVATE/ADMIN
const getOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate('user','id name')
    res.json(orders)
})




export {addOrderItems,getOrderById,updateOrderToPaid, updateOrderToDelivered,getMyOrders, getOrders}