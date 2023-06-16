const { findUser, saveUser } = require("../db/db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const errorTemplate = require("../templates/errorTemplate")
const userModel = require("../models/userModel")
const  mongoose  = require("mongoose")
require('dotenv').config()
exports.registerUser=async(req,res)=>{
    //find user
    const user = await findUser({email: req.body.email})
    try {
    if (user) {
        throw new Error('User exist, try logging in')
    } else {
        if (user) {
            return res.status(409).json({message: 'User exist, try logging again!'})
        }else{
            const user = new userModel()
            user._id= new mongoose.Types.ObjectId()
            console.log("user===>",user)
            console.log("req.body===>",req.body)
            const newUser = Object.assign(user,req.body)
            // encrypt the pass
            const hash=await bcrypt.hash(newUser.password,10)
            newUser.password=hash
            console.log("first")
            const User=await saveUser(newUser)
            console.log("Second")
            return res.status(201).json({
                message: 'Successful registration',
                user:User
            })

            // bcrypt.hash(newUser.password,10,function(err,hash){
            //     if (err) {
            //         return res.status(501).json({message:'Error: '+ err.message })
            //     }else{
            //         console.log("vo day")
            //        newUser.password=hash
            //        saveUser(newUser)
            //        .then((user)=>{
            //         console.log("first")
            //         console.log(user)
            //         return res.status(201).json({
            //             message: 'Successful registration',
            //             user:user
            //         })
            //        }).catch((err)=>{
            //         errorTemplate(res,err,"Can not save user!")
            //        })
            //     }
            // })
        }
        // .then((user)=>{
        //     console.log("user--->",user)
            
        // }).catch((err)=>{
        //     errorTemplate(res,err,"Can not find user!")
        // })
    }
    }
    catch (e) {
        return errorTemplate(res,e,e.message)
    }
    //if exist return response -> login
    //else
    //encrypt the password
}

exports.loginUser = async (req,res)=>{
    try {
        const loggedUser= await findUser({email: req.body.email})
        if (!loggedUser) {
            throw new Error('Authentication Failed: Unable to find user!')
        }else{
            const result = await bcrypt.compare(req.body.password, loggedUser.password)
           console.log(result)
            if (result) {
                loggedUser.password = null
                const token = jwt.sign({user: loggedUser},process.env.jwt_secret)
                return res.status(201).json({
                    user: loggedUser,
                    logged: true,
                    token: token,
                    message: 'Login Successful',
                })
            } else {
                throw new Error(
                    'Authentication failed: Email or password does not match'
                )
            }
        }
    } catch (e) {
        return errorTemplate(res,e,e.message)
        
    }
}