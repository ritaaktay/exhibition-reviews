    const express = require('express')
    const router = express.Router()
    const User = require('../models/user')

    router.get('/', (req, res) => {
    })

    router.get('/new', (req,res) => {
    })

    router.post('/', (req, res) => {
    })

    router.route('/:id')
    .get((req, res) => {
      res.send(`get user: ${req.user.name}`)
    })
    .put((req, res) => {
        res.send(`update user: ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`delete user: ${req.params.id}`)
    })

    module.exports = router