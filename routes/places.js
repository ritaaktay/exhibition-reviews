const express = require('express')
const router = express.Router()

router.route('/')
//ALL PLACES
.get((req, res) => {
    res.render('places/index')
})
//CREATE NEW PLACE
.post((req, res) => {
    res.send('New Place')
})
//NEW PLACE FORM
router.get('/new', (req,res) => {
    res.render('places/new')
})

router.route('/:id')
//ONE PLACE
.get((req, res) => {
    res.send(`Place: ${req.params.id}`)
})
//UPDATE Place
.put((req, res) => {
    res.send(`Update Place: ${req.params.id}`)
})
//DELETE EXHIBITION
.delete((req, res) => {
    res.send(`Delete Place: ${req.params.id}`)
})


module.exports = router