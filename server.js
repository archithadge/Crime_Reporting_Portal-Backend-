require('dotenv').config();
var connection=require('./SQL_Connection');
var express = require('express');

var app=express();

app.get('/',(req,res)=>{
    connection.query('SELECT * FROM DEMO', function (error, results, fields) {
        console.log(results);
        res.json({
            results
        })
    });
})

app.listen(process.env.PORT,()=>{
    console.log("Server started at port ",process.env.PORT);
})


