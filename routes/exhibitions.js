const express = require('express')
const router = express.Router()
const Exhibition = require('../models/exhibition')

router.route('/')
//ALL EXHIBITIONS
.get(async (req, res) => {
    try {
        const exhibitions = await Exhibition.find({})
        res.render('exhibitions/index', {exhibitions: exhibitions})
    } catch (err) {
        res.redirect('/', {errMessage: "Unable to retreive exhibitions"})
    }
})
//CREATE NEW EXHIBITION
.post(async (req, res) => {
    const exhibition = new Exhibition({
        title: req.body.title,
        review: req.body.review
    })
    try {
        const newExhibition = await exhibition.save()
        res.redirect(`exhibitions/${newExhibition.id}`) 
    } catch {
        res.render('exhibitions/new', {
            exhibition: exhibition,
            errMessage: "Unable to create new exhibition"
        })
    }
})
//NEW EXHIBITION FORM
//the new exhibition here is for the update form to display exhibition name and review 
router.get('/new', (req,res) => {
    res.render('exhibitions/new', { exhibition : new Exhibition()})
})

router.route('/:id')
//ONE EXHIBITION
.get((req, res) => {
    res.send(`Exhibition: ${req.params.id}`)
})
//UPDATE EXHIBITION
.put((req, res) => {
    res.send(`Update Exhibition: ${req.params.id}`)
})
//DELETE EXHIBITION
.delete((req, res) => {
    res.send(`Delete Exhibition: ${req.params.id}`)
})

module.exports = router