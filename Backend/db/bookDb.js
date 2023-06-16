const Book = require('../models/bookModel')

exports.findBooks = async (obj,selectValue)=>{
    return await Book.find(obj).select(selectValue).exec()
}
exports.findBook=async(obj, selectValues)=>{
    return await Book.findOne(obj).select(selectValues).exec()
}
exports.saveBook=async(newBook)=>{
    return await newBook.save()
}
exports.updateBook=async(fillter, update)=>{
    return await Book.updateOne(fillter,update,{new:true}).exec()
}
exports.deleteBook=async(obj)=>{
    return await Book.deleteOne(obj).exec()
}