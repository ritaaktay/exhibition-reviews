//NODE
const path = require('path')
const fs = require('fs')
//APP
const express = require('express')
const router = express.Router()
//MODELS
const Exhibition = require('../models/exhibition')
const Location = require('../models/location')
const Review = require('../models/reveiw')
const Comment = require('../models/comment')
const User = require('../models/user')

//ALL EXHIBITIONS
//ADD RECENTLY ADDED, HIGHEST RATED, MOST HEATED
router.get('/', async (req, res) => {
    let filter = {}
    if (req.query.title != null && req.query.title != "") {
        filter.title = new RegExp(req.query.title, 'i')
    }
    let query = Exhibition.find(filter).sort({createdAt:'desc'})
    let exhibitions = []
    for (let exhibition of await query.exec()) {
        if (req.query.lastReviewed != null && req.query.lastReviewed != "") {
            for (let id of exhibition.review_ids) {
                    let review = await Review.findById(id)
                    if (review.createdAt >= new Date(req.query.lastReviewed)) {
                        exhibitions.push(exhibition)
                        break
                    }
            } 
        } else {
            exhibitions.push(exhibition)
        }
    }
    //RENDER
    try {
        var reviewMap = {};
        for (let exhibition of exhibitions) {
            //displays last submitted review of exhibition 
            let review = await Review.findOne(
                {_id : exhibition.review_ids[exhibition.review_ids.length-1]})
            reviewMap[exhibition.id] = review
        }
        res.render('exhibitions/index', {
            exhibitions: exhibitions,
            reviewMap : reviewMap,
            searchOptions : req.query
        })
    } catch (err) {
        res.send(err.message)
    }
})

//NEW EXHIBITION FORM 
router.get('/new', async (req,res) => {
    const locations = await Location.find({});
    res.render('exhibitions/new', { 
        review: "",
        exhibition: new Exhibition(),
        locations: locations
        })
})

// CREATE NEW EXHIBITION
router.post('/', async (req, res) => {
    //EXHIBITION
    var exhibition = new Exhibition({
        title: req.body.title,
    })
    //HELPER FUNC FOR CATCH BLOCKS
    async function rerender(message) {
        let locations = await Location.find({})
        res.render('exhibitions/new', { 
            exhibition : exhibition,
            locations : locations,
            review : req.body.review,
            errMessage : message})
    }
    //LOCATION
    var location = await Location.findOne({_id : req.body.location})
    if (location == null) return rerender("Please select a location")
    else exhibition.location_id = location._id
    // REVIEW
    let review = new Review ({content: req.body.review, 
                              exhibition_id: exhibition._id,
                              images: saveImages(req.body.filepond)})
    try {
        await review.save()
        exhibition.review_ids = [review._id]
    } catch {
        rerender("Could not create review")
    }
    try {
        await exhibition.save()
        location.exhibition_ids.push(exhibition._id)
        await location.save()
        //here .id (not ._id) because we want a string in the url
        res.redirect(`exhibitions/${exhibition.id}`)
    } catch {
        //delete review if exhibition save fails
        await Review.deleteOne({ _id: review._id }) 
        //exhibition._Id was only added to location on succesfull exhibition save
        rerender("Could not create exhibition")
    }
})

router.route('/:id')
//ONE EXHIBITION
.get(async (req, res) => {
    try {
        const exhibition = await Exhibition.findOne({_id: `${req.params.id}`})
        const location = await Location.findOne({_id: exhibition.location_id})
        var reviews = []
        var commentMap = {}
        for (let id of exhibition.review_ids) {
            let review = await Review.findOne({_id: id})
            reviews.push(review)
            let comments = []
            for (let comment of review.comment_ids) {
                comments.push(await Comment.findOne({_id: comment}))
            }
            commentMap[review.id] = comments
        }
        res.render('exhibitions/exhibition', {
            exhibition: exhibition,
            location: location,
            reviews: reviews,
            commentMap: commentMap
        })
    } catch (err) {
        res.send(err.message)
    }
})
//UPDATE EXHIBITION
.put((req, res) => {
    res.send(`Update Exhibition: ${req.params.id}`)
})
//DELETE EXHIBITION
.delete(async (req, res) => {
    var exhibition = await Exhibition.findOne({_id:`${req.params.id}`})
    await exhibition.remove()
    res.redirect('/exhibitions')
})

function saveImages(filepond) {
    console.log(filepond)   
    if (filepond == null || filepond == "") return
    const images = []
    if (typeof filepond == 'string') {
        parsed = JSON.parse(filepond)
            if (parsed != null) images.push({
                data: new Buffer.from(parsed.data, 'base64'),
                type: parsed.type
            })
    } else {
        filepond.forEach(image => {
             parsed = JSON.parse(image)
            if (parsed != null) images.push({
                data: new Buffer.from(parsed.data, 'base64'),
                type: parsed.type
            })
        })
    }
    return images 
}

module.exports = router