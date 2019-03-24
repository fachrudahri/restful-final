'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'naikhaji2013',
    database: 'belajar_node_1'
});

connection.connect();
module.exports = connection;