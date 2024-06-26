const express = require('express');
const createError = require('http-errors');
const routes = require('./routes');
const securityMiddleware = require('./middleware/securityMiddleware');
// const infologger = require('./configs/logger');
const { loggerMiddleware } = require('./middleware');

const app = express();

process.on('unhandledRejection',(reason)=>{
    // infologger.error(reason);
    console.log(reason);
    process.exit(1);
});

//Middlewares
securityMiddleware(app);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
loggerMiddleware(app);

//routes for api
routes(app);

app.get('/',(req,res)=>{ res.status(200).send({success:true,message:"running..!"})});

app.use((req,res,next)=>{
    const error = createError(404);
    next(error);
});

app.use((error,req,res,next)=>{
    // infologger.error(error.message);
    console.log(error);
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    res.statusCode = error.statusCode;
    res.send({
        success:false,
        message : error.message
    });
});


module.exports = app;