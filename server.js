//ENVIRONMENT
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//APP
const express = require("express")
const app = express()

//VIEW
const expressLayouts = require("express-ejs-layouts")
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

//MODEL
const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//CONTROL
//use middleware here to run on all requests 
//Express.js works top to bottom   
app.get("/favicon.ico", (req, res) => {})
app.use(logger)

//parse JSON information from req.body
app.use(express.json())
//middleware to access req.body
app.use(express.urlencoded({ extended : true }))
//specify directory from which to serve static files
//request URL will not have /public, just /test/test.html
app.use(express.static('public'))
app.listen(process.env.PORT || 8000)

const userRouter = require("./routes/users")
app.use("/users", userRouter)

const exhibitionsRouter = require("./routes/exhibitions")
app.use("/exhibitions", exhibitionsRouter)

const indexRouter = require("./routes/index")
app.use("/", indexRouter)

//MIDDLEWARE
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}