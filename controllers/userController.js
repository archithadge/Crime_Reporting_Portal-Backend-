
var connection = require('../SQL_Connection');
var sha256 = require('js-sha256');
var jwt = require('jwt-then');
//Register new users
exports.register = (req, res) => {
    console.log(req.body)
    const name = req.body.name;
    const email = req.body.email;
    const password = sha256(req.body.password + process.env.SALT);
    const address = req.body.address;
    const aadhar = req.body.aadhar;
    const gender = req.body.gender;
    const mobile = req.body.mobile;


    // const aadhar='dd';

    const query = `SELECT * FROM Users WHERE Aadhar='${aadhar}' OR Mobile='${mobile}'`;
    console.log(query)
    connection.query(query, function (error, results, fields) {
        console.log(results);
        if (results.length != 0) {
            res.json({
                message: "User already exists"
            });
            return;
        }
        const addUserQuery = `INSERT INTO Users VALUES ('${name}','${email}','${password}','${address}','${aadhar}','${gender}','${mobile}')`;
        console.log(addUserQuery);
        connection.query(addUserQuery, function (error, results, fields) {
            if (error) console.log(error);
            if (!error) {
                res.json({
                    message: "User added Successfully"
                })
            }
        })
    })

};

//Login new user
exports.login = async (req, res) => {
    const email = req.body.email;
    const password = sha256(req.body.password + process.env.SALT);

    const query = `SELECT * FROM Users where Email='${email}' AND Password='${password}'`;
    connection.query(query, async function (error, results, fields) {
        if (results.length == 1) {
            console.log(results[0]);
            const token = await jwt.sign(results[0].Aadhar, process.env.SECRET);
            res.json({
                token
            })
        }
        res.json({
            message: "Invalid Credentials"
        })
    })

}

exports.registerComplaint=async (req,res)=>{
    const aadhar=req.payload;
    const location=req.body.location;
    const type=req.body.type;
    const date=req.body.date;
    const description=req.body.description;

    const query=`INSERT INTO Complaints (Aadhar,Location,Type,Date,Description) VALUES ('${aadhar}','${location}','${type}','${date}','${description}')`;
    console.log(query);

    connection.query(query,function(error,results,fields){
        if(!error){
            console.log("Complaint Registered successfully..!");
            res.json({
                message:"Complaint Registered successfully..!"
            })
        }
    })
}

exports.getComplaints=async (req,res)=>{
    const Aadhar=req.payload;
    const query=`SELECT * FROM Complaints WHERE Aadhar='${Aadhar}'`;
    console.log(query);
    connection.query(query,function(error,results,field){
        if(!error){
            // console.log(results);
            res.json({
                complaints:results
            })
        }
    })
}

