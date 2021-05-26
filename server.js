require('dotenv').config();
var connection=require('./SQL_Connection');
var express = require('express');

var app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',require('./routes/user'));
// app.get('/',(req,res)=>{
//     connection.query('SELECT Name FROM DEMO', function (error, results, fields) {
//         console.log(results);
//         res.json({
//             results
//         })
//     });
// })

var server=app.listen(process.env.PORT,()=>{
    console.log("Server started at port ",process.env.PORT);
})


