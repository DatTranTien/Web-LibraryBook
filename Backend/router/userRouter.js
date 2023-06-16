const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const { saveUser, findUser } = require('../db/db')
const router = express.Router()
const User=require('../models/userModel')
const userModel = require('../models/userModel')
const errorTemplate = require('../templates/errorTemplate')
const { loginUser, registerUser } = require('../services/userService')
// const errorTemplate = require('../templates/errorTemplate')

router.post('/register', registerUser)

router.post("/login", loginUser)

module.exports=router