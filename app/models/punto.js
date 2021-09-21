const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PuntoSchema = new Schema({
    titulo: String,
    fecha: {anho:Number, mes:Number, dia:Number, dc:{type:Boolean, default: true}},
    texto: String
},{ timestamps: true, collection: 'Punto'})

module.exports = mongoose.model('Punto', PuntoSchema);