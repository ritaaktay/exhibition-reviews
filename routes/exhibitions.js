const express = require('express')
const router = express.Router()
const Exhibition = require('../models/exhibition')


//ALL EXHIBITIONS
//ADD RECENTLY ADDED, HIGHEST RATED, MOST HEATED
router.get('/', async (req, res) => {
    try {
        const exhibitions = await Exhibition.find()
        res.render('exhibitions/index', {
            exhibitions: exhibitions,
        })
    } catch (err) {
        res.redirect('/', {errMessage: "Unable to retreive exhibitions"})
    }
})
//SEARCH EXHIBITIONS
//ADD SUPPORT FOR MULTIPLE SEARCH PARAMETERS
router.get('/search', async (req,res) => {
    let searchOptions = {}
    if (req.query.title != null && req.query.title != "") {
        searchOptions.title = new RegExp (req.query.title, 'i')
    }
    if (req.query.keyword != null && req.query.keyword != "") {
        searchOptions.review = new RegExp (req.query.keyword, 'i')
    }
    try {
        const exhibitions = await Exhibition.find(searchOptions)
        res.render('exhibitions/search', {
            exhibitions: exhibitions,
            searchOptions : req.query
        })
    } catch (err) {
        res.redirect('/', {errMessage: "Unable to retreive exhibitions"})
    }
})

//NEW EXHIBITION FORM
//the new exhibition here is for the update form to display exhibition name and review 
router.get('/new', (req,res) => {
    res.render('exhibitions/new', { exhibition : new Exhibition()})
})
//CREATE NEW EXHIBITION
router.post('/', async (req, res) => {
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