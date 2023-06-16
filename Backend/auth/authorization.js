require('dotenv').config()
const jwt = require('jsonwebtoken')
const { messages } = require('../messages/messages')
const errorTemplate=require('../templates/errorTemplate')

module.exports = (req,res,next)=>{
    try {
        const [,token] = req.headers.authorization.split('')
        next()
    } catch (e) {
        errorTemplate(res,e,messages.auth_failed)
    }
}