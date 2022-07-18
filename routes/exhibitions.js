const path = require('path')
const fs = require('fs')
const express = require('express')
const router = express.Router()
const Exhibition = require('../models/exhibition')
const Location = require('../models/location')
const Review = require('../models/review')
const Comment = require('../models/comment')
const getImageMap = require('../public/javascripts/getImageMap')
const saveImages = require('../public/javascripts/saveImages')

router.get('/', (req, res) => {
    allExhibitions(req, res)
})

router.get('/new', async (req,res) => {
    res.render('exhibitions/new', { 
        review: new Review(),
        exhibition: new Exhibition(),
        locations: await getLocations()
        })
})

router.post('/', async (req, res) => {
    var exhibition = new Exhibition()
    async function send(message) {
        res.render('exhibitions/new', { 
            exhibition : exhibition,
            locations : await getLocations(),
            review : req.body.review,
            errMessage : message})
    }
    if (req.body.title.match(/^\s+$/)) {
        return send("Please enter a title")
    } else exhibition.title = req.body.title
    var location = await Location.findById(req.body.location)
    if (location == null) return send("Please select a location")
    else exhibition.location_id = location._id
    let review = new Review ({content: req.body.review, 
                              exhibition_id: exhibition._id,
                              images: saveImages(req.body.filepond)})
    try {
        await review.save()
        exhibition.review_ids = [review._id]
        await exhibition.save()
        location.exhibition_ids.push(exhibition._id)
        await location.save()
        res.redirect(`exhibitions/${exhibition.id}`)
    } catch(error) {
        process.stdout.write(error)
        await Review.deleteOne({_id: review._id})
        await Exhibition.deleteOne({_id: exhibition._id})
        return send("Could not save review")
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        let exhibition = await Exhibition.findById(req.params.id)
        res.render('exhibitions/edit', {
            exhibition : exhibition,
            locations : await getLocations()})
    } catch {
        allExhibitions(req, res, 'Exhibition not found')
    }
})

router.route('/:id')
.get((req, res) => {
    oneExhibition(req, res)
})

.put(async (req, res) => {
    if (req.body.title.match(/^\s+$/)) {
        res.render('exhibitions/edit', {exhibition: new Exhibition(),
                                        errMessage: "Please enter a title"})
    }
    let exhibition
    try {
        exhibition = await Exhibition.findById(req.params.id)
        exhibition.title = req.body.title
        exhibition.location_id = req.body.location
        await exhibition.save()
        res.redirect(`/exhibitions/${req.params.id}`)
    } catch (error) {
        if (exhibition == null) {
            allExhibitions(req, res, 'Exhibition not found')
        } else {
            res.render('exhibitions/edit', {exhibition: exhibition,
                                            errMessage: "Could not save edits"})
        }
    }
})
.delete(async (req, res) => {
    let exhibition
    try {
        exhibition = await Exhibition.findById(req.params.id)
    } catch {
        allExhibitions(req, res, "Exhibition not found")
    } try {
        await exhibition.remove()
        res.redirect('/exhibitions')
    } catch {
        oneExhibition(req, res, 'Exhibition could not be deleted')
    }
})

async function getLocations() {
   let locations = await Location.find({}).sort({location:1})
   return locations
}

async function allExhibitions(req, res, errMessage = req.query.errMessage) {
    let filter = {}
    if (req.query.title != null && req.query.title != "") {
        filter.title = new RegExp(req.query.title, 'i')
    }
    if ((req.query.location) != null && req.query.location != "") {
        filter.location_id = req.query.location
    }
    let exhibitions = []
    let query = Exhibition.find(filter).populate('review_ids').sort({createdAt:'desc'})
    for (let exhibition of await query.exec()) {
        if (req.query.lastReviewed != null && req.query.lastReviewed != "") {
            for (let review of exhibition.review_ids) {
                if (review.createdAt >= new Date(req.query.lastReviewed)) {
                    exhibitions.push(exhibition)
                    break
                }
            } 
        } else {
            exhibitions.push(exhibition)
        }
    }
    res.render('exhibitions/index', {
        locations: await getLocations(),
        exhibitions: exhibitions,
        imageMap: getImageMap(exhibitions),
        searchOptions : req.query,
        errMessage : errMessage
    })
}

async function oneExhibition(req, res, errMessage = req.query.errMessage) {
    try {
        let exhibition = await Exhibition.findById(req.params.id)
        .populate('location_id')
        .populate({
            path: 'review_ids',
            populate: { path: 'comment_ids'}
        })
        res.render('exhibitions/exhibition', {exhibition: exhibition,
                                              errMessage: errMessage})
    } catch (err) {
        allExhibitions(req, res, 'Exhibition not found')
    }
}

module.exports = router