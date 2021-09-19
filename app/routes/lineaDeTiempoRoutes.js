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
        const lineasMapeadas = lineas.map((linea) => {
            return {"id" : linea._id, "titulo" : linea.titulo}
        })
        res.json(lineasMapeadas)
    })
})

router.get('/:id', async (req, res) => {
    LineaDeTiempo.findById(req.params.id,(err, linea) => {
        if(err || !linea){
            res.sendStatus(404)
        } else {
            res.json(linea)
        }
    })
})

router.put('/:id', async (req, res) => {
    const { categoria, puntos, titulo} = req.body
    LineaDeTiempo.findByIdAndUpdate(req.params.id, {categoria, puntos, titulo}, {new: true},(err, linea) => {
        if(err || !linea){
            res.sendStatus(404)
        } else {
            res.json(linea)
        }
    })
})

module.exports = router