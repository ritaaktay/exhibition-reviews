//ENVIRONMENT
if (process.env.NODE_ENV !== 'production') {
    //'dotenv' loads environment variables from .env file into process.env
    //so the DATABASE_URL in the .env file will set process.env.DATABASE_URL = 
    //mongodb://localhost/exhibition-reviews
    //on heroku, process.env.NODE_ENV will be production and DATABASE_URL
    //value will be set to Mongo Atlas database url in settings
    require('dotenv').config()
}

//APP
//app.method(PATH, HANDLER)
// app is an instance of express
// method is an HTTP request method
// PATH is a path on the server
// HANDLER is the function executed when the route is matched
const express = require("express")
const app = express()
//serves static files in the specified root path
//localhost:port/images/image will be served from
//public/images/image
app.use(express.static('public'))
//parse incoming request bodies and make available as req.body in handlers
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({limit :'10mb', extended: false}))
//overrides req.method property with key in the URL query string
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
//process.env.port (ex. heroku) or if not set, 8000
app.listen(process.env.PORT || 8000)


//VIEW
const expressLayouts = require("express-ejs-layouts")
app.use(expressLayouts)
//Template engines replace variables in a template file with actual values at runtime
//and transforms the template into an HTML file sent to the client
app.set('view engine', 'ejs')
//directory for template files
app.set('views', __dirname + '/views')
//sets default layout 
app.set('layout', 'layouts/layout')

//MODEL
const mongoose = require("mongoose")
//useNewUrlParser is a deprication work around for MongoDB Node.js parser and Mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
//log database errors
db.on('error', error => console.error(error))

//CONTROL
//"use the express.Router class to create modular, mountable route handlers"
//https://expressjs.com/en/guide/routing.html
const userRouter = require("./routes/users")
const exhibitionsRouter = require("./routes/exhibitions")
const locationsRouter = require("./routes/locations")
const indexRouter = require("./routes/index")
const reviewsRouter = require("./routes/reviews")
const commentsRouter = require("./routes/comments")
app.use("/", indexRouter)
app.use("/users", userRouter)
app.use("/exhibitions", exhibitionsRouter)
app.use("/locations", locationsRouter)
app.use("/reviews", reviewsRouter)
app.use("/comments", commentsRouter)
