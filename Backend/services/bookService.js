const { default: mongoose } = require('mongoose')
const { findBooks, findBook, saveBook, updateBook, deleteBook } = require('../db/bookDb')
const { messages } = require('../messages/messages')
const bookModel = require('../models/bookModel')
const errorTemplate = require('../templates/errorTemplate')
const { successTemplate } = require('../templates/successTemplate')

exports.getAllBooks =  async (req,res)=>{
    try {
        const books = await findBooks({},'-__v')
        return res.status(200).json({
            message: messages.books_found,
            result: books
        })
    } catch (e) {
        return errorTemplate(res,e,e.message, 500)
    }
}
exports.getAllBookIds =  async (req,res)=>{
    try {
        const books = await findBooks({},'title')
        return res.status(200).json({
            message: messages.books_found,
            result: books
        })
    } catch (e) {
        return errorTemplate(res,e,e.message, 500)
    }
}
exports.getBookById =  async (req,res)=>{
    try {
        console.log("req.params.bookId===>",req.params.bookId)
        const book = await findBook({_id:req.params.bookId},'-__v')
        console.log("boook=====>",book)
        if (!book) {
            throw new Error(messages.book_not_found)
        } else {
            successTemplate(res,book,messages.book_found,200)
        }
    } catch (e) {
        return errorTemplate(res,e,e.message, 500)
    }
}
exports.postBook =  async (req,res)=>{
    try {
        const bookStub = new bookModel()
        const foundBook = Object.assign(bookStub,req.body)
        const book = await findBook(foundBook)
        console.log("check 1 book",book)
        if (book) {
            throw new Error(messages.book_cataloged)
        } else {
            let newBook = new bookModel({
                _id:new mongoose.Types.ObjectId(),
            })
            
             newBook=Object.assign(newBook,req.body)
             console.log("check 1 ")
            const savedBook = await saveBook(newBook)
            console.log("check savedBook",savedBook)
            successTemplate(res,savedBook,messages.book_saved,200)
        }
    } catch (e) {
        return errorTemplate(res,e,e.message, 500)
    }
}
exports.updateBookService =  async (req,res)=>{
    try {
        const bookStub = new bookModel()
        const id = req.params.bookId;
        const update = Object.assign(bookStub,req.body)
        const result = await updateBook({_id: id},update)
        return successTemplate(res,result,messages.book_updated,200)
    } catch (e) {
        return errorTemplate(res,e,messages.book_not_updated, 500)
    }
}
exports.deleteBookService =  async (req,res)=>{
    try {
       const id = req.params.bookId;
       const result = await deleteBook({_id:id})
        return successTemplate(res,result,messages.book_deleted,200)
    } catch (e) {
        return errorTemplate(res,e,messages.book_not_deleted, 500)
    }
}

// exports.getAllBooksIds = async (req,res)=>{
//     try {
//         const books = await findBooks({},'_id,title')
//         return res.status(200).json({
//             message: 'Successful Books',
//             books: books
//         })
//     } catch (e) {
//         return errorTemplate(res,e,e.message, 500)
//     }
// }