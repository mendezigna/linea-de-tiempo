const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Punto = require('./punto')

const LineaDeTiempoSchema = new Schema({
    titulo: String,
    categoria: String,
    puntos: [Punto.schema]
}, {timestamps: true, collection: 'LineaDeTiempo'});

module.exports = mongoose.model('LineaDeTiempo', LineaDeTiempoSchema);