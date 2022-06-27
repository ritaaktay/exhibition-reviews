const express = require('express')
const router = express.Router()
router.use(exhibitionsMiddleware)

router.get('/', (req, res) => {
    res.send('Exhibition List')
})

function exhibitionsMiddleware(req,res,next) {
    //currently does nothing
    next()
}

module.exports = router