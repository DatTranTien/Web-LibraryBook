const express = require('express')
const cors=require('cors')
const userRouter = require('../router/userRouter')
const {connectDB} = require('../db/db')
const bookRouter = require('../router/bookRouter')
const authorRouter = require('../router/authorRouter')
const swaggerUi = require('swagger-ui-express');
const document = require("../config/swaggerOptions.json")

const app= express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

//add router
app.use('/user',userRouter)
app.use('/books',bookRouter)
app.use('/authors',authorRouter)

//use middleware for api-docs swagger
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(document))

app.get('/',(req,res,next)=>{
    res.status(200).json({message:"Call thanh cong!"})
})
app.use((req,res,next)=>{
    const error = new Error('Not Found!')
    error.status = 404
    error.name="Oi Zoi Oi!"
    error.message="Cuoc Doi",
    error.stack="kafkskf"
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:{
            message:error.message,
            status: error.status,
            name: error.name,
            stack:error.stack
        }
    })
})
connectDB()
module.exports=app
