const mysql = require('mysql');

const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'',
    database: 'dlr'
})

con.connect((err)=>{
    if(err) throw err;
    console.log("Connected to MySql DB!!!!!");
})

module.exports.con = con;