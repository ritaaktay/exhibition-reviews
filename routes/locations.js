const express = require('express')
const router = express.Router()
const Location = require('../models/location')
const Exhibition = require('../models/exhibition')
const Review = require('../models/review')
const mongoose = require('mongoose')
const getImageMap = require('../public/javascripts/getImageMap')

router.route('/')
.get(async (req, res) => {
    allLocations(req, res)
})
.post(async (req, res) => {
    const location = new Location({
        location: req.body.location
    })
    try {
        await location.save()
        res.redirect(`locations/${location.id}`)
    } catch {
        res.render('locations/new', {
            location: location,
            errMessage: `Could not create location`
        })
    }
})

router.get('/new', (req,res) => {
    res.render('locations/new', {location : new Location()})
})

router.get('/:id/edit', async (req, res) => {
    try {
        let location = await Location.findById(req.params.id)
        res.render('locations/edit', {location : location})
    } catch {
        allLocations(req, res, 'Could not load location')
    }
    
})

router.route('/:id')
.get((req, res) => {
    oneLocation(req, res)
})
.put(async (req, res) => {
    try {
        let location = await Location.findById(req.params.id)
        location.location = req.body.location
        location.save()
        res.redirect(`/locations/${location.id}`)
    } catch {
        res.render('locations/edit', {location: location,
                                      errMessage: "Could not save edits"})
    }
})
.delete(async (req, res) => {
    let location
    try {
        location = await Location.findById(req.params.id)
        await location.remove()
        res.redirect('/locations')
    } catch (err) {
        if (location == null) {
            allLocations(req, res, "Location not found")
        } else {
            oneLocation(req, res, err.message)
        }
    }
})

async function allLocations(req, res, errMessage = null) {
    const locations = await Location.find({}).sort({location :1})
    res.render('locations/index', {locations: locations,
                                    errMessage: errMessage})
}

async function oneLocation(req, res, errMessage = null) {
    try {
        let exhibitions = await Exhibition.find({location_id: req.params.id})
                                     .populate('review_ids')
                                     .sort({createdAt:'desc'})
        let location = await Location.findOne({_id: req.params.id})
        res.render('locations/location', {
            location: location,
            exhibitions: exhibitions,
            imageMap : getImageMap(exhibitions),
            errMessage: errMessage
        })
    } catch {
        allLocations(req, res, 'Could not load location')
    }
}

module.exports = router