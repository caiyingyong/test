/**
 * Created by lenovo on 2017/4/18.
 */
"use strict";

let app = require('../app');
let port = require('../config/params.config').port;

app.listen(port,()=>{
    console.log('listen port:' + port);
});
