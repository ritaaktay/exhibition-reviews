    const express = require('express')
    const router = express.Router()

    const users = {"rita" : {name: "Rita"}}

    router.get('/', (req, res) => {
        res.send('User List')
    })

    router.get('/new', (req,res) => {
        res.render("users/new")
    })

    router.post('/', (req, res) => {
        const isValid = false;
        if (isValid) {
            let user = req.body.name.toLowerCase()
            users[user] = {name: req.body.name}
            console.log(users)
            res.redirect(`/users/${user}`)
        } else {
            console.log("error")
            res.render("users/new", {name: `${req.body.name}`})
        }
    })

    //dynamically determined url ":" + parameter
    //!put dynamic routes below static so doesn't override (ex. '/new')
    //router.route allows to chain different methods to a url 
    router.route('/:id')
    .get((req, res) => {
      res.send(`Get User: ${req.user.name}`)
    })
    .put((req, res) => {
        res.send(`Update: User ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete User: ${req.params.id}`)
    })

    //param function runs anytime there is a request to that param 
    //middleware: runs between req send and res return
    //so console.log before get/put/delete, need to call next() for code to move on
    router.param('id', (req, res, next, id) => {
        req.user = users[id]
        next()
    })

    module.exports = router