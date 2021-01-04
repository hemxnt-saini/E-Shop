import User from './../models/userModel.js'
import asyncHandler from 'express-async-handler'    
import genrateToken from '../utils/generateToken.js'

//Fetch Auth User and Get ToKEN
//POST /api/users/login
//PUBLIC
const authUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:genrateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


//Register a User
//POST /api/users
//PUBLIC
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body
    
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:genrateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})


//Get Logged in user 
//GET /api/users/profile
//PRIVATE- Protected Route(Need Token)
const getUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


//Get Update user profile 
//PUT /api/users/profile
//PRIVATE
const updateUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: genrateToken(updatedUser._id)
        })

    }else{
        res.status(404)
        throw new Error('User not found')
    }
})


export {authUser, getUserProfile, registerUser, updateUserProfile}   