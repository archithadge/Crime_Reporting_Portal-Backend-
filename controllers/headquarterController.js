var connection = require('../SQL_Connection');
var sha256 = require('js-sha256');
var jwt = require('jwt-then');

exports.register=(req,res)=>{
    const email=req.body.email;
    const password=sha256(req.body.password+process.env.SALT);

    const query=`SELECT * FROM Headquarters WHERE Email='${email}'`;

    connection.query(query,function(error,results,fields){
        if(results.length!=0){
            res.json({
                message:"Headquarter already exists..!"
            })
            return;
        }
        const addHeadquarterQuery=`INSERT INTO Headquarters VALUES ('${email}','${password}')`;

        connection.query(addHeadquarterQuery,function(error,results,fields){
            res.json({
                message:"Headquarter added successfully..!"
            })
        })
    })
}

exports.login=(req,res)=>{
    const email=req.body.email;
    const password=sha256(req.body.password+process.env.SALT);

    const query=`SELECT * FROM Headquarters WHERE Email='${email}' AND Password='${password}'`;

    connection.query(query,async function(error,results,fields){
        if(results.length==0){
            res.json({
                message:"Headquarter doesn't exists"
            })
            return;
        }
        const token=await jwt.sign(email,process.env.SECRET);
        res.json({
            token
        })
    })
}