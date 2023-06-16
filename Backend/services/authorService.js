const { findAuthorById, saveAuthor, findAuthors, updateAuthor, deleteAuthorDB } = require("../db/authorDb")
const { messages } = require("../messages/messages")
const Author = require("../models/authorModel")
const errorTemplate = require("../templates/errorTemplate")
const { successTemplate } = require("../templates/successTemplate")
const { default: mongoose } = require('mongoose')

exports.postAuthor = async(req,res)=>{
    try {
        console.log("req--->",req.body)
        const author = await findAuthorById({
            name: req.body.name,
            book: req.body.bookId,
        })
        console.log("author===>",author)
        if (author) {
            throw new Error(messages.author_exist)
        } else {
            console.log("1111===>",req.body)
            const newAuthor = new Author({
                _id: new mongoose.Types.ObjectId(),
                // book:new mongoose.Types.ObjectId(),
            })
            console.log("2newAuthor===>",newAuthor)
            const assignedAuthor = await Object.assign(newAuthor,req.body)
            console.log('3assignedAuthor:',assignedAuthor)
            console.log("sau 3===>",req.body)
            const savedAuthor = await saveAuthor(assignedAuthor)
            console.log("4savedAuthor",savedAuthor)
            return successTemplate(res,savedAuthor,messages.author_saved,201)
        }
    } catch (e) {
        console.log("errrrrr")
        errorTemplate(res,e,e.message,500)
    }
}
exports.getAuthors = async(req,res)=>{
    try {
        const authors = await findAuthors({})

        if (authors.length>0) {
            return successTemplate(res,authors, messages.authors_found,200)
        } else {
            throw new Error(messages.authors_not_found)
        }
    } catch (e) {
        console.log("errrrrr")
        errorTemplate(res,e,e.message,500)
    }
}
exports.getAuthorById = async(req,res)=>{
    try {
        const id = await req.params.authorId
        const author =await findAuthorById({_id:id})
        if (author) {
            return successTemplate(res,author, messages.author_found,200)
        } else {
            throw new Error(messages.author_not_found)
        }
    } catch (e) {
        console.log("errrrrr")
        errorTemplate(res,e,e.message,500)
    }
}
exports.patchAuthor = async(req,res)=>{
    try {
        const id = await req.params.authorId
        const author = new Author();
        const update = Object.assign(author,req.body)
        const result = updateAuthor({_id:id},update)
        return successTemplate(res,result, messages.author_update,200)
        // } else {
        //     throw new Error(messages.author_not_found)
        // }
    } catch (e) {
        console.log("errrrrr")
        errorTemplate(res,e,messages.author_not_update,500)
    }
}
exports.deleteAuthor = async(req,res)=>{
    try {
        const id = await req.params.authorId
        const result = await deleteAuthorDB({_id:id})
        return successTemplate(res,result, messages.author_delete,200)
        // } else {
        //     throw new Error(messages.author_not_found)
        // }
    } catch (e) {
        errorTemplate(res,e,messages.author_not_delete,500)
    }
}