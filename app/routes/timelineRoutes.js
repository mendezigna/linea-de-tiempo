const express = require('express')
const router = express.Router();
const Timeline = require('../models/timeline')
const { authenticateToken } = require('../middleware/middlewares')
const Category = require('../utils/category')


router.post('/', authenticateToken, async (req, res) => {
    const owner = req.user.email
    const { title, category, events, eras, scale} = req.body
    Timeline.create({ title, category, events, owner, collaborators: [], published: false, eras, scale}).then(result => {
        res.status(201)
        res.json(result)
    }).catch(err => {
        res.status(500).send(err)
    })

})

router.get('/', async (req, res) => {
    Timeline.find((err, timelines) => {
        res.json(timelines)
    })
})

router.get('/example', async (req, res) => {
    var rto = []
    const categories = Category.getCategories
    var results = Promise.all(categories.map(category => {
        return Timeline.findOne({ category, published: true })
    }))

    results.then(timelines => {
        res.json(timelines.filter(tl => tl))
    })
})

router.get('/mytimelines', authenticateToken, async (req, res) => {
    const email = req.user.email
    Timeline.find({ $or: [{ owner: email }, { collaborators: email }] }).then(result => {
        res.json(result)
    })
})

router.get('/category/:category', async (req, res) => {
    Timeline.find({ "category": req.params.category, published: true }, (err, timelines) => {
        res.json(timelines)
    })
})
router.get('/view/:id', async (req, res) => {
    Timeline.findById(req.params.id, (err, timeline) => {
        if (err || !timeline) {
            res.sendStatus(404)
        } else {
            res.json(timeline)
        }
    })
})

router.get('/:id', authenticateToken,async (req, res) => {
    const owner = req.user.email
    Timeline.findOne({_id: req.params.id, owner}, (err, timeline) => {
        if (err || !timeline) {
            res.sendStatus(404)
        } else {
            console.log(timeline)
            res.json(timeline)
        }
    })
})


router.put('/:id', authenticateToken, async (req, res) => {
    const { title, category, events, eras, scale} = req.body
    Timeline.findByIdAndUpdate(req.params.id, { title, category, events, eras, scale}, { new: true }, (err, timeline) => {
        if (err || !timeline) {
            res.sendStatus(404)
        } else {
            res.json(timeline)
        }
    })
})

router.post('/:id/publish', authenticateToken, async (req, res) => {
    Timeline.findByIdAndUpdate(req.params.id, { published: true }, { new: true }, (err, timeline) => {
        if (err || !timeline) {
            res.sendStatus(404)
        } else {
            res.json(timeline)
        }
    })
})

router.post('/:id/unpublish', authenticateToken, async (req, res) => {
    Timeline.findByIdAndUpdate(req.params.id, { published: false }, { new: true }, (err, timeline) => {
        if (err || !timeline) {
            res.sendStatus(404)
        } else {
            res.json(timeline)
        }
    })
})

router.delete('/:id', authenticateToken, async (req, res) => {
    Timeline.findByIdAndRemove(req.params.id, () => {
        res.status(200).json()

    })
})

module.exports = router