
const Author = require('../models/authorModel')

exports.findAuthors=async(obj)=>{
    return await Author.find(obj).populate('book').select('-__v').exec()
}
exports.findAuthorById=async(obj)=>{
    return await Author.findOne(obj).populate('book').select('-__v').exec()
}
exports.saveAuthor=async(newAuthor)=>{
    console.log("newAuthor===>",newAuthor)
    return await newAuthor.save()
}
exports.updateAuthor=async(fillter, update)=>{
    return await Author.updateOne(fillter,update,{new:true}).exec()
}
exports.deleteAuthorDB=async(obj)=>{
    return await Author.deleteOne(obj).exec()
}