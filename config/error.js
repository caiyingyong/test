/**
 *@description 错误内容
 *@author zijun
 *@createTime 16/11/15
 */
'use strict';
let error = {
    userNotLogin: {
        code: 100001,
        message: "User not login in!"
    },
    userAlreadyExist: {
        code: 100002,
        message: "User already exist!"
    },
    informationLoss: {
        code: 100003,
        message: "Information is loss!"
    },
    informationError: {
        code: 100004,
        message: "Information is error!"
    },
    userNotFound: {
        code: 100005,
        message: "Account or password is wrong!"
    },
    dataUpdateFail: {
        code: 100006,
        message: "Data update fail!"
    },
    userLowAuth: {
        code:100007,
        message: "没有权限！"
    },
    dataNotFound: {
        code: 100008,
        message: "Data not found!"
    }
};
module.exports = error;