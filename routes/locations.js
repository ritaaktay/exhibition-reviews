const express = require('express')
const router = express.Router()
const Location = require('../models/location')

router.route('/')
//ALL LOCATIONS
.get(async (req, res) => {
    const locations = await Location.find({})
    res.render('locations/index', {locations : locations})
})
//CREATE NEW LOCATION
.post(async (req, res) => {
    const location = new Location({
        location: req.body.location
    })
    try {
        const newLocation = await location.save()
        res.redirect(`locations/${newLocation.id}`)
    } catch (error) {
        res.render('locations/new', {
            location: location.location,
            errMessage: `Could not create location ${location.location}`
        })
    }
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
    res.send(`Delete Location: ${req.params.id}`)
})


module.exports = router