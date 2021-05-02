const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRouter = require('./api/router/products');

const app = express();

mongoose.connect(
    'mongodb+srv://hanoj:Newpass2@@node-rest-shop-7gyns.mongodb.net/test?retryWrites=true', 
    {
    useNewUrlParser : true,
    useUnifiedTopology : true
    }
);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extend : false}));
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

app.use('/product', productsRouter);


app.use('/',(req, res, next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    res.status(404).json({
        error : error
    });
    // next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});



module.exports = app;