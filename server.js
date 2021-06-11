require('dotenv').config();
const bodyParser = require('body-parser')
var connection=require('./SQL_Connection');
var express = require('express');
const path=require('path');

var app=express();
app.use(express.static('client'));
app.get('*',(req,res)=>{
    console.log('vnbvbn');
    res.sendFile(path.join(__dirname,'client','heatmap.html'));
})
// app.use(require('cors'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',require('./routes/user'));
app.use('/headquarter',require('./routes/headquarter'));





function randomNumber(min, max) { 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 18+randomNumber(43267,60860)/100000,73+randomNumber(76281,96988)/100000)
app.get('/random',(req,res)=>{
    const status=['Resolved','Pending'];
    const crime=['Robbery','Murder','Domestic Violence']
    for(var i=0;i<=10000;i++){
        var dd=randomNumber(1,28).toString();
        var mm=randomNumber(1,12).toString();
        var yy=randomNumber(2001,2021).toString();

        var dt=yy+'/'+mm+'/'+dd;
        const query=`INSERT INTO DummyData VALUES (${i+5},'PUNE','${crime[randomNumber(0,2)]}','${status[randomNumber(0,1)]}','${dt}',${18+randomNumber(43267,60860)/100000},${73+randomNumber(76281,96988)/100000})`;
        // console.log(query);
        connection.query(query,function(error,results,fields){
            if(error){console.log(error);throw "Error"}
            if(!error){
                console.log("Successfully Inserted ",i);
            }

        })
    }
    console.log('Done');

})

app.post('/mapdata',(req,res)=>{
    const query=req.body.query;
    console.log("request",req.body);
    connection.query(query,function(error,results,fields){
        console.log(results,query);
        res.json({
            results
        })
    })
})




var server=app.listen(process.env.PORT,()=>{
    console.log("Server started at port ",process.env.PORT);
})


