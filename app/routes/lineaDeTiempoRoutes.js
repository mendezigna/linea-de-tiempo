const express = require('express')
const router = express.Router();
const LineaDeTiempo = require('../models/lineaDeTiempo')

router.post('/', async (req, res) => {
    const {titulo, puntos} = req.body
    const linea = new LineaDeTiempo({titulo, puntos})
    linea.save().then(ldt => {
        res.status(201)
        res.json(ldt)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
    
})

router.get('/', async (req, res) => {
    LineaDeTiempo.find((err, lineas) => {
        res.json(lineas)
    })
})

router.get('/:id', async (req, res) => {
    LineaDeTiempo.findById({"_id": req.params.id},(err, lineas) => {
        if(err || !lineas){
            res.sendStatus(404)
        } else {
            res.json(lineas)
        }
    })
})

module.exports = router