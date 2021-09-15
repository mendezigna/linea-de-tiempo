const express = require('express')
const router = express.Router();
const LineaDeTiempo = require('../models/lineaDeTiempo')

router.post('/', async (req, res) => {
    const {titulo, categoria, puntos} = req.body
    const linea = new LineaDeTiempo({titulo, categoria, puntos})
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

router.get('/categoria/:categoria', async (req,res)=>{
    LineaDeTiempo.find({"categoria":req.params.categoria},(err, lineas) =>{
        res.json(lineas)
    })
})

router.get('/:id', async (req, res) => {
    LineaDeTiempo.findById({"_id": req.params.id},(err, linea) => {
        if(err || !linea){
            res.sendStatus(404)
        } else {
            res.json(linea)
        }
    })
})

module.exports = router