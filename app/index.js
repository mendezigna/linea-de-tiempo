require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO;
const port = process.env.PORT 

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

app.use((req, res) => {
    res.status(404);
    res.json({
      status: 404,
      errorCode: 'RESOURCE_NOT_FOUND'
    }); 
});

app.listen(port)
console.log(`Servidor corriendo en el puerto ${port}`)

module.exports = app;
