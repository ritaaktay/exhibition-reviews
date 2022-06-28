//ENVIRONMENT
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//APP
const express = require("express")
const app = express()
//logger after favicon so it's not logged
app.use(logger)
app.use(express.urlencoded({ extended : true }))
app.use(express.json())
app.use(express.static('public'))
app.listen(process.env.PORT || 8000)

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
const userRouter = require("./routes/users")
app.use("/users", userRouter)

const exhibitionsRouter = require("./routes/exhibitions")
app.use("/exhibitions", exhibitionsRouter)

const indexRouter = require("./routes/index")
app.use("/", indexRouter)

//MIDDLEWARE
function logger(req, res, next) {
    //if (req.originalUrl != "/favicon.ico") {
        console.log(req.originalUrl)
        next()
    //}
}