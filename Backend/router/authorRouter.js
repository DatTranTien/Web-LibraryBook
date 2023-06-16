const express= require('express');
const authorization = require('../auth/authorization');
const { postAuthor, getAuthors, getAuthorById, patchAuthor, deleteAuthor } = require('../services/authorService');
const authorRouter=express.Router();

authorRouter.post("/",[authorization,postAuthor])
authorRouter.get("/",[authorization,getAuthors])
authorRouter.get("/:authorId",[authorization,getAuthorById])
authorRouter.patch("/:authorId",[authorization,patchAuthor])
authorRouter.delete("/:authorId",[authorization,deleteAuthor])
module.exports = authorRouter