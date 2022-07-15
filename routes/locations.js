const express = require('express')
const router = express.Router()
const Location = require('../models/location')
const Exhibition = require('../models/exhibition')
const Review = require('../models/review')
const mongoose = require('mongoose')

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
.get(async (req, res) => {
    let id = req.params.id
    let location = await Location.findOne({_id: id})
    let query = Exhibition.find({location_id: id}).sort({createdAt:'desc'})
    let exhibitions = await query.exec()
    try {
        res.render('locations/location', {
            location: location,
            exhibitions: exhibitions,
            reviewMap : await getLastReviews(exhibitions),
            imageMap : await getThumbnails(exhibitions)
        })
    } catch (err) {
        res.send(err.message)
    }
})
//UPDATE LOCATION
.put((req, res) => {
    res.send(`Update Location: ${req.params.id}`)
})
//DELETE LOCATION
.delete((req, res) => {
    res.send(`Delete Location: ${req.params.id}`)
})

async function getLastReviews(exhibitions) {
    var reviewMap = {};
    for (let exhibition of exhibitions) {
        //displays last submitted review of exhibition 
        let id = exhibition.review_ids[exhibition.review_ids.length-1]
        let lastReview = await Review.findOne(
            {_id : id})
        reviewMap[exhibition.id] = lastReview
    }
    return reviewMap
}

async function getThumbnails(exhibitions) {
    var imageMap = {};
    for (let exhibition of exhibitions) {
        //looks up all reviews and finds one with image, if any
        for (let id of exhibition.review_ids) {
            let review = await Review.findOne({_id : id})
            if (review.hasImage == false) continue
            else {
                imageMap[exhibition.id] = review.hasImage
                break
            }
        }
    }
    return imageMap
}

module.exports = router