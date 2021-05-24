require('dotenv').config()
var express = require('express');
var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
