const http = require('http')
const app = require('./app/app')
require('dotenv').config()
console.log(process.env)
http.createServer(app).listen(process.env.port,()=>{
    console.log(`Dang chay cong ${process.env.port}`)
})