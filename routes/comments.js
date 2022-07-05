//APP
const express = require('express')
const router = express.Router()
//MODELS
const Exhibition = require('../models/exhibition')
const Review = require('../models/reveiw')
const Comment = require('../models/comment')
const mongoose = require('mongoose')

router.get('/', async (req, res) => {
    let comments = await Comment.find()
    res.render('comments/index', {comments: comments})
})
//CREATE NEW COMMENT
//sending params from comment form submission in _review.ejs
//req.body.review = review.id
router.post('/', async (req, res) => {
    var comment = new Comment ({
        content: req.body.comment,
        review_id: new mongoose.Types.ObjectId(`${req.body.review}`)
    })
    try {
        await comment.save()
        let review = await Review.findOne({_id: req.body.review})
        review.comment_ids.push(comment._id)
        await review.save()
        let exhibition = await Exhibition.findOne({_id: review.exhibition_id})
        res.redirect(`exhibitions/${exhibition.id}`)
    } catch (err) {
        res.send(err.message)
    }
})

router.route('/:id')
//ONE COMMENT
.get((req, res) => {
    res.send(`Comment: ${req.params.id}`)
})
//UPDATE COMMENT
.put((req, res) => {
    res.send(`Update Comment: ${req.params.id}`)
})
//DELETE COMMET
.delete((req, res) => {
    res.send(`Delete Comment: ${req.params.id}`)
})

module.exports = router