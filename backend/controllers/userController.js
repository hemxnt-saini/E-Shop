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

export {authUser}