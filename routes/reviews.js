//APP
const express = require('express')
const router = express.Router()
//MODELS
const Review = require('../models/reveiw')
const Exhibition = require('../models/exhibition')
//SCRIPTS
const upload = require('../scripts/upload')
const { restart } = require('nodemon')

router.route('/')
//ALL REVIEWS
.get(async (req, res) => {
    const reviews = await Review.find({})
    var exhibitionMap = {}
    for (let review of reviews) {
        let exhibition = await Exhibition.findOne({_id: review.exhibition_id})
        exhibitionMap[review.id] = exhibition
    }
    res.render('reviews/index', {
        reviews : reviews,
        exhibitionMap : exhibitionMap 
    })
})
//CREATE NEW REVIEW
//here req.body.exhibition should be exhibition.id
//from the form submission on exhibition page 
.post(upload.array('image', 10), async (req, res) => {
    var review = new Review ({
        content: req.body.review,
        exhibition_id: req.body.exhibition,
    })
    for (let file of req.files) {
        review.images.push(file.filename)
    }
    try {
        await review.save()
        //findOneAndUpdate (so it also returns the updated)
        var exhibition = await Exhibition.findOne({_id: req.body.exhibition})
        exhibition.review_ids.push(review._id)
        await exhibition.save()
        res.redirect(`exhibitions/${exhibition.id}`)
    } catch (err) {
        res.send(err)
    }
})

router.route('/:id')
//ONE REVIEW
.get((req, res) => {
    res.send(`Review: ${req.params.id}`)
})
//UPDATE REVIEW
.put((req, res) => {
    res.send(`Update Review: ${req.params.id}`)
})
//DELETE REVIEW
.delete((req, res) => {
    res.send(`Delete Review: ${req.params.id}`)
})


module.exports = router