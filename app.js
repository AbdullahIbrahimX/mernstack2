var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var  v1 = require('./routes/v1');

var app = express();


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

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');


//----- Routes Config -----//
app.use('/api/v1',v1);




module.exports = app;
