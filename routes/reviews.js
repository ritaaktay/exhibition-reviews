const express = require('express')
const router = express.Router()
const Review = require('../models/review')
const Exhibition = require('../models/exhibition')
const saveImages = require('../public/javascripts/saveImages')

router.route('/')
.get(async (req, res) => {
    const reviews = await Review.aggregate([
        {$lookup:{ from: 'exhibitions', localField: 'exhibition_id', foreignField: '_id', as: 'exhibition' }},
        {$sort: {'exhibition.title':1}}
        ])
    //aggregation returns plain js object so can't use virtual properties from the model
    reviews.forEach(review => {
        review.images = review.images.map(image => {
            return `data:${image.type};charset=utf-8;base64,${image.data.toString('base64')}`
        })
    })
    res.render('reviews/index', {reviews : reviews})
})


.post(async (req, res) => {
    function send(err){
        res.redirect(`exhibitions/${exhibition.id}?errMessage=${
            encodeURIComponent("Could not save review:")}
            ${encodeURIComponent(err)}`)
    }
    var review = new Review ({
        content: req.body.review,
        exhibition_id: req.body.exhibition,
        images: saveImages(req.body.filepond)
    })
    try {
        await review.save()
    } catch(err){
       send(err)
    } try {
        var exhibition = await Exhibition.findById(req.body.exhibition)
        exhibition.review_ids.push(review._id)
        await exhibition.save()
        res.redirect(`exhibitions/${exhibition.id}`)
    } catch(err) {
        await review.remove()
        send(err)
    }
})

router.get('/:id/edit', async (req, res) => {
    res.send(`edit review: ${req.params.id}`)
})

router.route('/:id')
.put((req, res) => {
    res.send(`update review: ${req.params.id}`)
})
.delete((req, res) => {
    res.send(`delete review: ${req.params.id}`)
})

module.exports = router