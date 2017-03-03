const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
    console.log('connected to db'+config.database);
});

//on error
mongoose.connection.on('error',(err)=>{
    console.log('connection err'+err);
});

const app = express();

const port = 3000;

const users= require('./routes/users');

//Enable CORS middleware
app.use(cors());

//set staic folder
app.use(express.static(path.join(__dirname,'public')));

//Enable bodyparser middleware
app.use(bodyParser.json());

app.use('/users',users);

//index route default
app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});

// start server
app.listen(port, () =>{
    console.log('Server started on port'+ port);
});