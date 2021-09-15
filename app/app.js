require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json());
const lineaDeTiempoRouter = require('./routes/lineaDeTiempoRoutes')

app.use(cors());

app.use('/lineaDeTiempo', lineaDeTiempoRouter)

app.use((req, res, next) => {
    res.status(404);
    res.json({
      status: 404,
      errorCode: 'RESOURCE_NOT_FOUND'
    }); 
});


module.exports = app;
