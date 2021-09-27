const app = require('./app')
const port = process.env.PORT 
const boot = require('./boot')

const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO;

mongoose.connect(MONGO_URL).then((res) => {
    console.log('Connected');
    boot()
}).catch(console.log);


app.listen(port)
console.log(`Server running on port ${port}`)

