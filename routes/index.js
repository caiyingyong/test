/**
 * Created by lenovo on 2017/4/18.
 * 登录注册
 */
"use strict";

let router = require('express').Router();
let error = require('../config/error');
let logger = require('../lib/logger');
let DB = require('../framework/DB');
let generateMd5 = require('../lib/md5').generateMd5;
let session = require('../lib/middleware/session');


router.get('/',function (req,res,next) {
    console.log('index page');
    res.redirect('./index.html');
})
/**
* 测试
*/
router.get("/ceshi",function (req, res, next) {
    res.json({
        success:true,
        error:null
    })
});
/**
 * 注册
 */
router.post('/register',function (req, res, next) {
    logger.info('/register');
    logger.info('注册');

    if (!req.body.account || !req.body.password) {
        //无帐号和密码
        throw error.informationLoss;
    }
    return DB.User.findAll({
        where: {
            account: req.body.account
        }
    }).then(function (_users) {
        if (_users.length > 0) {
            //用户已经存在
            throw error.userAlreadyExist;
        }
        let newUser = {
            account: req.body.account,
            password: generateMd5(req.body.password),
            registerTime: new Date()
        };
        return DB.User.create(newUser);
    }).then(function (_newUser) {
        res.json({
            success: true,
            error: null,
            newUser: _newUser
        });
    }).catch(function (_err) {
        res.json({
            success: false,
            error: _err
        });
    });
});

/**
 * 登录
 */
router.post('login',function (req, res, next) {

    if(!req.body.account || !req.body.password){
        throw error.informationLoss;
    }
    return DB.User.findOne({
        where:{
            account:req.body.account,
            password:generateMd5(req.body.password)
        }
    }).then(function (_user) {
        if(!_user){
            throw error.userNotFound;
        }
        let token = session.newToken(req,{ID:_user.ID});

        res.json({
            success:true,
            error:null,
            user:_user,
            token:token
        });
    }).then(function (_err) {
        res.json({
            success:false,
            error:_err
        })
    })
});


module.exports = router;
