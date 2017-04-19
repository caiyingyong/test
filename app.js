/**
 * Created by lenovo on 2017/4/18.
 */
"use strict";

let express = require('express');
let app = express();
let exec = require('child_process').exec;
let path = require('path');
let fs = require('fs');
let logger = require('./lib/logger');
let cookieParser = require('cookie-parser');
let filter = require('./lib/middleware/session').filter;
let busboy = require('connect-busboy');
let bodyParser = require('body-parser');

app.use('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    if(req.method=="OPTIONS") {
        res.send(200);/*让options请求快速返回*/
    }
    else  {
        next();
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(busboy());
app.use(cookieParser());
app.use(filter);


/**
 * routes
 */
let routes = require('./routes/index');

app.use('/',routes);

// webhook
app.post('/webhook', function (req, res) {
    if ('hooks' === req.body['token']) {
        exec('git pull', {'cwd': '/home/cy/nodeService'},
            (error, stdout, stderr) => {
                console.log('stdout========================\n' + stdout);
                console.log('stderr========================\n' + stderr);
                if (error !== null) {
                    res.send('<pre>fail!!!\n' + stdout + error + '</pre>');
                } else {
                    res.send('<pre>done!!!\n' + stdout + '</pre>');
                }
            });
    } else {
        console.log(' failed token ');
        res.send('<pre>token不正确?</pre>');
    }
});


// static
app.use('/', express.static(__dirname + '/static'));

/**
 * ********************************************************************************************
 * 异常处理
 * ********************************************************************************************
 */
app.use(function (err, req, res, next) {
    logger.error(err);
    let returnJson = {
        success: false,
        error: err
    };
    res.json(returnJson);
});
// view engine
app.set('view engine', 'ejs');
app.set('view', 'views');


module.exports = app;
