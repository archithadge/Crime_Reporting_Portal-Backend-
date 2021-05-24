var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports=con;