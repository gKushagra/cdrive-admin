/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require('dotenv').config();

var mysql = require('mysql');
var connection;

function getConnection() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB
    });
    return connection;
}

async function execQuery(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(
            query,
            values,
            (err, result) => {
                return err ? reject(err) : resolve(result[0]);
            }
        );
    });
}

module.exports = {
    getConnection,
    execQuery,
}