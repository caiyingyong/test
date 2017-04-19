/**
 * Created by lenovo on 2017/4/18.
 */
"use strict";

let log4js = require('log4js');

log4js.configure({
   appenders:[
       {
           type:'console'
       },
       {
            type:'file',
            filename:'logs/log.log',
            maxLogSize:1024 *1024,
            backups:3,
            category:'log'
       }
   ]
});

let logger = log4js.getLogger('log');
logger.setLevel('INFO');

module.exports = logger;