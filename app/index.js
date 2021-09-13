const app = require('./app')
const port = process.env.PORT 

const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO;

mongoose.connect(MONGO_URL).then((res) => {
    console.log('Connected');
}).catch(console.log);

app.listen(port)
console.log(`Servidor corriendo en el puerto ${port}`)