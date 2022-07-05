const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.redirect('/exhibitions')
})

router.get('/about', (req,res) => {
    res.render('about')
})

module.exports = router