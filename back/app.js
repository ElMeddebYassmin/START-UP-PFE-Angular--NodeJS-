const PORT =3127
require('./DB/db');
const io = require('socket.io')
const express = require('express');
const bodyParser = require('body-parser')
const {User,Projet}= require('./src/models/relations')
const app = express();

const appRouter = require('./src/routes/appRouter');


// Socket.io

//multer
app.use('/projets', express.static('projets'));
app.use('/images', express.static('images'));
//midelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(appRouter);
const server = app.listen(PORT, (req, res, next) => { console.log(`Server started on port` +PORT) })
app.get('/', (req, res) => {
    res.send(`Server started on port $PORT`);
});


module.exports = server