const express = require('express')
const authorization = require('../auth/authorization')
const { getAllBooks, getBookById, updateBookService, deleteBookService, postBook, getAllBookIds } = require('../services/bookService')
const bookRouter = express.Router()

// (req,res,next)=>{
//     res.status(200).json({
//         message:"Successful Call!",
//         metadata:{
//             hostname:req.hostname,
//             method:req.method
//         }
//     })
// }
bookRouter.get('/',[authorization,getAllBooks])

bookRouter.get('/books',[authorization,getAllBookIds])
// bookRouter.get('/:id',(req,res,next)=>{
//     res.status(200).json({
//         message:`Succcessful GET ${req.params.id}`,
//         metadata:{
//             hostname:req.hostname,
//             id:req.params.id,
//             method:req.method
//         }
//     })
// })
// (req,res,next)=>{
//     res.status(200).json({
//         message:`Succcessful GET by ID`,
//         metadata:{
//             hostname:req.hostname,
//             id:req.params.id,
//             method:req.method
//         }
//     })
// }
bookRouter.get('/:bookId',[authorization,getBookById])

bookRouter.post('/',[authorization,postBook])
// (req,res,next)=>{
//     res.status(200).json({
//         message:"Successful PUT",
//         metadata:{
//             hostname:req.hostname,
//             method:req.method
//         }
//     })
// }
bookRouter.put("/:bookId",[authorization,updateBookService])
// (req,res,next)=>{
//     res.status(200).json({
//         message:"Successful DELETE",
//         metadata:{
//             hostname:req.hostname,
//             method:req.method
//         }
//     })
// }
bookRouter.delete("/delete/:bookId",[authorization,deleteBookService])

module.exports = bookRouter