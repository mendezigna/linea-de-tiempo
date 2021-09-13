require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, () =>{
    console.log('Connected');
});
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.status(404);
    res.json({
      status: 404,
      errorCode: 'RESOURCE_NOT_FOUND'
    }); 
});

module.exports = app;
