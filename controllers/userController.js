
var connection=require('../SQL_Connection');
//Register new users
exports.register=(req,res)=>{
    console.log(req.data)
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const address=req.body.address;
    const aadhar=req.body.aadhar;
    const gender=req.body.gender;
    const mobile=req.body.mobile;

    
    // const aadhar='dd';

    const query=`SELECT * FROM Users WHERE Aadhar='${aadhar}'`;
    console.log(query)
    connection.query(query, function (error, results, fields) {
        if(results.length!=0)throw 'User already exists';
        const addUserQuery=`INSERT INTO Users VALUES ('${name}','${email}','${password}','${address}','${aadhar}','${gender}','${mobile}')`;
        connection.query(addUserQuery, function (error, results, fields) {
            if(!error){
                res.json({
                    message:"User added Successfully"
                })
            }
        })
    })

};

//Login new user
exports.login=async (req,res)=>{
    

}

