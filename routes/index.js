/**
 * Created by lenovo on 2017/4/18.
 */
"use strict";

let router = require('express').Router();


router.get('/',function (req,res,next) {
    console.log('index page');
    res.redirect('./index.html');
});

router.get("/ceshi",function (req, res, next) {
    res.json({
        success:true,
        error:null
    })
});

router.get("/caiyong",function (req, res, next) {
    res.json({
        success:true,
        error:null
    })
});


module.exports = router;
