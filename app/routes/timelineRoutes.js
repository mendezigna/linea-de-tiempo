const express = require('express')
const router = express.Router();
const Timeline = require('../models/timeline')
const { authenticateToken } = require('../middleware/middlewares')
const Category = require('../utils/category')


router.post('/', authenticateToken, async (req, res) => {
    const { title, subtitle, category, entries } = req.body
    Timeline.create({title,  subtitle, category, entries}).then(result => {
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

router.get('/example', async (req,res) =>{
    var rto = []
    const categories = Category.getCategories
    var results = Promise.all(categories.map(category => {
        return Timeline.findOne({category})
    }))

    results.then(timelines => {
        res.json(timelines.filter(tl => tl))
    })
})

router.get('/category/:category', async (req,res)=>{
    Timeline.find({"category":req.params.category},(err, timelines) =>{
        const mappedTimelines = timelines.map((timeline) => {
            return {"id" : timeline._id, "title" : timeline.title}
        })
        res.json(mappedTimelines)
    })
})

router.get('/:id', async (req, res) => {
    Timeline.findById(req.params.id,(err, timeline) => {
        if(err || !timeline){
            res.sendStatus(404)
        } else {
            res.json(timeline)
        }
    })
})

router.put('/:id', authenticateToken, async (req, res) => {
    const { category, subtitle, entries, title} = req.body
    Timeline.findByIdAndUpdate(req.params.id, {category, subtitle, entries, title}, {new: true},(err, timeline) => {
        if(err || !timeline){
            res.sendStatus(404)
        } else {
            res.json(timeline)
        }
    })
})

module.exports = router