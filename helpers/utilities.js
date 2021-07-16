/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
require('dotenv').config();
var bcrypt = require('bcrypt');
var { v4: uuid } = require('uuid');
var jwt = require('jsonwebtoken');

async function getHash(data) {
    return bcrypt.hashSync(data, 10);
}

async function compareHash(plain, hash) {
    return bcrypt.compareSync(plain, hash);
}

async function genUUID() {
    return uuid();
}

async function genToken(payload) {
    return jwt.sign({ user: payload }, process.env.TKN_SECRET);
}

module.exports = {
    getHash,
    compareHash,
    genUUID,
    genToken,
}