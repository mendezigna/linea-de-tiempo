const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PuntoSchema = new Schema({
    titulo: String,
    fecha: Date,
    texto: String
},{ timestamps: true, collection: 'Punto'})

module.exports = mongoose.model('Punto', PuntoSchema);