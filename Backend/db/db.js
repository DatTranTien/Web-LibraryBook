require('dotenv').config()
const mongoose = require("mongoose")
const userModel = require('../models/userModel')
const User = require('../models/userModel')

// note remove async if want not give error
const connectDB =  () => {
    try {
        mongoose.set('strictQuery',true)
         mongoose.connect(process.env.mongo,  
          console.log("Mongo is runing!"))
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

const disconnect = ()=>{
    mongoose.connection.close()
}

const findUser = async (obj)=>{
    return User.findOne(obj).exec()
    // return Promise.resolve({
    // "firstName":obj.firstName,
    // "lastName" : obj.lastName,
    // "address":obj.address,
    // "city": obj.city,
    // "state":obj.state,
    // "zipcode":obj.zipcode,
    // "email": obj.email,
    // "password": obj.password
    // })
}

const saveUser=async (newUser)=>{
    return await newUser.save()
    // return Promise.resolve({
    //     "firstName":"DAT",
    //     "lastName" : "Tran",
    //     "address":"Ha Noi",
    //     "city": "Ha Noi",
    //     "state":"Ohio",
    //     "zipcode":"10000",
    //     "email": "dat@gmail.com",
    //     "password": "123456"
    //     })
}


module.exports = {connectDB,saveUser,findUser,disconnect}