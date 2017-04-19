/**
* @description session相关
* @author 吴亚
* @createTime 2016/6/27
*/
"use strict";
let tokenConfig = require('../../config/params.config').token;
let uuid = require('node-uuid');
let logger = require('../logger');

let sessions = {};

/**
 * @description 删除token
 * @param user
 */
function removeToken(user) {
    let id = user.ID;

    try{
        for(let i in sessions){
            if(sessions[i]['session']['uid'] === id){
                logger.info("删除token为" + i + "的session");
                delete sessions[i];
            }
        }
    }catch (err){
        logger.info("session的错误是"+err);
    }
}

/**
 * @description 生成新的token
 * @param req
 * @param user
 * @returns {string}
 */
function newToken(req, user) {
    removeToken(user);
    let time = (new Date()).getTime();
    let token = uuid.v4() + '_' + time;
    logger.info('generate token :' + token);

    let sessionRecord = {
        expired: time + tokenConfig.expires,
        session: {
            token: token,
            uid: user.ID
        }
    };
    sessions[token] = sessionRecord;

    req.session = sessionRecord.session;
    return token;
}

/**
 * @description 根据token获取session
 * @param token
 * @returns {*}
 */
function getSession(token) {
    let session = sessions[token];
    if (session) {
        let time = (new Date()).getTime();
        if (session.expired < time) {
            delete sessions[token];
            return {};
        }
        return session.session;
    }
    return {};
}

/**
 * @description 做token的预处理
 * @param req
 * @param res
 * @param next
 */
function filter(req, res, next) {
    let token = null;

    if ('token' in req.query) {
        token = req.query.token;
    } else if ('token' in req.cookies) {
        token = req.cookies.token;
    }else if ('token' in req.body){
        token = req.body.token
    }

    if (token) {
        req.session = getSession(token);
    }
    else {
        req.session = {};
    }

    next();
}

/**
 * @description 保存session
 * @param req
 * @param res
 * @param next
 */
function saveSession(req, res, next) {
    let token = null;

    if ('token' in req.query) {
        token = req.query.token;
    } else if ('token' in req.cookies) {
        token = req.cookies.token;
    } else if ('token' in req.body){
        token=req.body.token
    }

    if (token) {
        sessions[token].session = req.session;
    }
}

// 暴露方法
exports.filter = filter;
exports.saveSession  = saveSession;
exports.newToken = newToken;

