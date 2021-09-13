require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO;

mongoose.connect(MONGO_URL, {
    
}, () =>{
    console.log('Connected');
});
const app = express();

app.use(express.json());
const lineaDeTiempoRouter = require('./routes/lineaDeTiempoRoutes')

app.use('/lineaDeTiempo', lineaDeTiempoRouter)

app.use((req, res, next) => {
    res.status(404);
    res.json({
      status: 404,
      errorCode: 'RESOURCE_NOT_FOUND'
    }); 
});

module.exports = app;
