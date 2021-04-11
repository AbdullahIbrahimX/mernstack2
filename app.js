const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const  v1 = require('./routes/v1');

const app = express();


//----- DB Config -----//
mongoose.connect(process.env.MONGO_DB_URI ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
});
mongoose.connection.on("connected",()=>{
    console.log("Connected to database Sunkinfully")
});
mongoose.connection.on("error",(err)=>{
    console.error("ERROR IN DB CONNECTION",err)
});

//----- Middleware Config -----//
app.use(logger('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize);
app.use(passport.session);
require('./config/passport')(passport);


//----- Routes Config -----//
app.use('/api/v1',v1);




module.exports = app;
