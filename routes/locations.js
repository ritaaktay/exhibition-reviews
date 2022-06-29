const express = require('express')
const router = express.Router()

router.route('/')
//ALL LOCATIONS
.get((req, res) => {
    res.render('locations/index')
})
//CREATE NEW LOCATION
.post((req, res) => {
    res.send('New Location')
})
//NEW LOCATION FORM
router.get('/new', (req,res) => {
    res.render('locations/new')
})

router.route('/:id')
//ONE LOCATION
.get((req, res) => {
    res.send(`Location: ${req.params.id}`)
})
//UPDATE LOCATION
.put((req, res) => {
    res.send(`Update Location: ${req.params.id}`)
})
//DELETE LOCATION
.delete((req, res) => {
    res.send(`Delete Place: ${req.params.id}`)
})


module.exports = router