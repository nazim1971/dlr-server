// const mysql = require('../db').con;
// const util = require('util');
// const exp = require('constants');
// // promisify the query method
// const myDB = util.promisify(mysql.query).bind(mysql);

const myDB = require('../db').query



const getAllLabels = async(req,res)=>{
    const result = await myDB("SELECT * FROM label");
    res.json(result);
}

module.exports = {getAllLabels};