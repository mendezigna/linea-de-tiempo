const express = require('express')
const router = express.Router();
const Timeline = require('../models/timeline')

router.post('/', async (req, res) => {
    const { title, subtitle, category, entries } = req.body
    const tl = new Timeline({title,  subtitle, category, entries})
    tl.save().then(result => {
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

router.put('/:id', async (req, res) => {
    console.log("I AM INSIDE THE PUT EL ID ES: "+req.params.id)
    const { category, subtitle, entries, title} = req.body
    Timeline.findByIdAndUpdate(req.params.id, {category, subtitle, entries, title}, {new: true},(err, timeline) => {
        if(err || !timeline){
            console.log(err, timeline);console.log("EL ERROR ESTA ACA DUGLAS :(")
            res.sendStatus(404)
        } else {
            res.json(timeline)
        }
    })
})

module.exports = router