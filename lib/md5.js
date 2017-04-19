/**
 * Created by mrchen on 16/11/15.
 */
'use strict';
let crypto = require('crypto');
let salt = require('../config/params.config').salt;

function generateMd5(str) {
  let md5 = crypto.createHash('md5');
  md5.update(str).update(salt);
  return md5.digest('hex');
}

exports.generateMd5 = generateMd5;