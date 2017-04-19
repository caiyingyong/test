/**
 *@description
 *@author zijun
 *@createTime 16/11/15
 */
"use strict";
let Sequelize = require('sequelize');
let logger = require('../lib/logger');
let config = require('../config/DB.config');
let uuid = require('node-uuid');

let database = config.database;
let userName = config.user;
let password = config.password;
let DB = {};
var techtech = new Sequelize(database, userName, password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        charset: 'utf8'
    }
});

let currentUsages = [];
techtech.authenticate()
    .then(function(err) {
        logger.info('[DB] connect ' + database + ' user: ' + userName);
        DB.sequelize = techtech;
        DB.Promise = techtech.Promise;
        initDB();
    })
    .catch(function(err) {
        console.log(err);
        logger.error('[DB] connect error ' + database + ' user: ' + userName);

    });

function initDB() {
    DB.User = techtech.define('User', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: Sequelize.STRING(50),
        account: Sequelize.STRING(50),
        password: Sequelize.STRING(50),
        position: Sequelize.STRING(50),
        contactName: Sequelize.STRING(50),
        contactPhone: Sequelize.STRING(50),
        email: Sequelize.STRING(50),
        companyName: Sequelize.STRING(50),
        province: Sequelize.STRING(50),
        city: Sequelize.STRING(50),
        headImage: Sequelize.STRING(50),
        registerTime: Sequelize.DATE,
        resume: Sequelize.STRING(1000), // 个人简历，经历等
    }, {
        'timestamps': false
    });
    DB.Company = techtech.define('Company', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category: Sequelize.INTEGER(8),
        companyName: Sequelize.STRING(50),
        contactName: Sequelize.STRING(50),
        contactPhone: Sequelize.STRING(50),
        address: Sequelize.STRING(50),
        createDate: Sequelize.DATE,
        userID: Sequelize.INTEGER(11)
    }, {
        'timestamps': false
    });
    DB.Difficulty = techtech.define('Difficulty', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        uuid: Sequelize.STRING,
        category: Sequelize.INTEGER(8),
        title: Sequelize.STRING(20),
        publishRange: Sequelize.STRING(20),
        province: Sequelize.STRING(20),
        contact: Sequelize.STRING(20),
        contactMethod: Sequelize.STRING(50),
        address: Sequelize.STRING(50),
        price: Sequelize.STRING(50),
        endDate: Sequelize.DATE,
        description: Sequelize.STRING(50),
        createTime: Sequelize.DATE,
        isChecked: Sequelize.STRING(50),
        userID: Sequelize.INTEGER(11),
        city: Sequelize.STRING(50),
        click: Sequelize.INTEGER,
        image: Sequelize.STRING(50)
    }, {
        'timestamps': false
    });
    DB.Expert = techtech.define('Expert', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        uuid: Sequelize.STRING,
        category: Sequelize.INTEGER(8),
        name: Sequelize.STRING(20),
        province: Sequelize.STRING(20),
        city: Sequelize.STRING(20),
        address: Sequelize.STRING(50),
        contactMethod: Sequelize.STRING(50),
        company: Sequelize.STRING(50),
        position: Sequelize.STRING(20),
        achievement: Sequelize.STRING(500),
        createTime: Sequelize.DATE,
        expertImg: Sequelize.STRING(50),
        isChecked: Sequelize.STRING(50),
        description: Sequelize.STRING(50),
        userID: Sequelize.INTEGER(11)
    }, {
        'timestamps': false
    });
    DB.Demand = techtech.define('Demand', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        uuid: Sequelize.STRING,
        category: Sequelize.INTEGER(8),
        number: Sequelize.STRING(50),
        title: Sequelize.STRING(20),
        publishRange: Sequelize.STRING(20),
        province: Sequelize.STRING(20),
        contact: Sequelize.STRING(20),
        contactMethod: Sequelize.STRING(50),
        address: Sequelize.STRING(50),
        price: Sequelize.STRING(50),
        endDate: Sequelize.DATE,
        description: Sequelize.STRING(50),
        createTime: Sequelize.DATE,
        isChecked: Sequelize.STRING(50),
        userID: Sequelize.INTEGER(11),
        city: Sequelize.STRING(50),
        click: Sequelize.INTEGER,
        image: Sequelize.STRING(50)
    }, {
        'timestamps': false
    });
    DB.Transfer = techtech.define('Transfer', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        uuid: Sequelize.STRING,
        category: Sequelize.INTEGER(8),
        number: Sequelize.STRING(50),
        title: Sequelize.STRING(20),
        publishRange: Sequelize.STRING(20),
        province: Sequelize.STRING(20),
        contact: Sequelize.STRING(20),
        contactMethod: Sequelize.STRING(50),
        contactCompany: Sequelize.STRING(50),
        address: Sequelize.STRING(50),
        price: Sequelize.STRING(50),
        endDate: Sequelize.DATE,
        description: Sequelize.STRING(50),
        createTime: Sequelize.DATE,
        isChecked: Sequelize.STRING(50),
        userID: Sequelize.INTEGER(11),
        city: Sequelize.STRING(50),
        click: Sequelize.INTEGER,
        image: Sequelize.STRING(50)
    }, {
        'timestamps': false
    });
    DB.Worker = techtech.define('Worker', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        uuid: Sequelize.STRING,
        category: Sequelize.INTEGER(8),
        click: Sequelize.INTEGER(8),
        title: Sequelize.STRING(20),
        tag: Sequelize.STRING(50), // 标签，用逗号分隔
        feature: Sequelize.STRING(50), // 特点
        publishRange: Sequelize.STRING(20),
        province: Sequelize.STRING(20),
        contact: Sequelize.STRING(20),
        contactMethod: Sequelize.STRING(50),
        contactCompany: Sequelize.STRING(50),
        address: Sequelize.STRING(50),
        cooperation: Sequelize.STRING(20),
        price: Sequelize.STRING(50),
        endDate: Sequelize.DATE,
        description: Sequelize.STRING(50),
        createTime: Sequelize.DATE,
        isChecked: Sequelize.STRING(50),
        userID: Sequelize.INTEGER(11),
        city: Sequelize.STRING(50),
        image: Sequelize.STRING(50),
        relativeProduct: Sequelize.STRING(50), // 相关产品
        applyRange: Sequelize.STRING(100), // 应用范围

    }, {
        'timestamps': false
    });
    DB.Example = techtech.define('Example', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        table: Sequelize.INTEGER(8),
        category: Sequelize.INTEGER(8),
        title: Sequelize.STRING(20),
        publishRange: Sequelize.STRING(20),
        province: Sequelize.STRING(20),
        contact: Sequelize.STRING(20),
        contactMethod: Sequelize.STRING(50),
        address: Sequelize.STRING(50),
        cooperation: Sequelize.STRING(20),
        price: Sequelize.STRING(50),
        description: Sequelize.STRING(50),
        createTime: Sequelize.DATE,
        successTime: Sequelize.DATE,
        userID: Sequelize.INTEGER(11),
        city: Sequelize.STRING(50),
        image: Sequelize.STRING(50)
    }, {
        'timestamps': false
    });
    DB.Collection = techtech.define('Collection', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        projectID: Sequelize.INTEGER(11),
        projectKind: Sequelize.INTEGER(8),
        projectTitle: Sequelize.STRING(20),
        collectDate: Sequelize.DATE,
        uuid: Sequelize.STRING,
        userID: Sequelize.INTEGER(11)
    }, {
        'timestamps': false
    });
    DB.Comment = techtech.define('Comment', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        uuid: Sequelize.STRING(50),
        floor: Sequelize.INTEGER(11),
        content: Sequelize.STRING(50),
        replyContent: Sequelize.STRING(50),
        replyTime: Sequelize.DATE,
        createTime: Sequelize.DATE,
        userID: Sequelize.INTEGER
    }, {
        'timestamps': false
    });
    DB.Province = techtech.define('Province', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: Sequelize.STRING(20),
        range: Sequelize.STRING(20),
        sort: Sequelize.INTEGER
    }, {
        'timestamps': false
    });
    DB.City = techtech.define('City', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: Sequelize.STRING(20),
        provinceID: Sequelize.INTEGER(11)
    }, {
        'timestamps': false
    });
    DB.Message = techtech.define('Message', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: Sequelize.STRING(20),
        content: Sequelize.STRING(50),
        uuid: Sequelize.STRING(50),
        createTime: Sequelize.DATE,
        userID: Sequelize.INTEGER(11),
        status: Sequelize.INTEGER(4)
    }, {
        'timestamps': false
    });
    DB.Category = techtech.define('Category', {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(20),
            unique: true
        },
        number: Sequelize.INTEGER(4),
        description: Sequelize.STRING(50)
    }, {
        'timestamps': false
    });

    /**
     * [foreignKey description]
     */
    DB.User.hasMany(DB.Comment, {
        foreignKey: 'userID'
    });
    DB.Comment.belongsTo(DB.User, {
        foreignKey: 'userID'
    });

    return techtech.sync(); // 所有model全部sync
}
module.exports = DB;
