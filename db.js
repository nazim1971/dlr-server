
const mysql = require('mysql');
const util = require('util');

// MySQL connection configuration
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password:'',
    database: 'dlr'
});

// Connect to MySQL
con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Promisify MySQL query method
const query = util.promisify(con.query).bind(con);

module.exports = { query };
