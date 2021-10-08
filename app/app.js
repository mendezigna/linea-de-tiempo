require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();

app.use(express.json());
const timelineRouter = require('./routes/timelineRoutes')
const userRouter = require('./routes/userRoutes')

app.use(cors());

app.use('/timeline', timelineRouter)
app.use('/user', userRouter)

app.use((req, res, next) => {
    res.status(404);
    res.json({
      status: 404,
      errorCode: 'RESOURCE_NOT_FOUND'
    }); 
});


module.exports = app;
