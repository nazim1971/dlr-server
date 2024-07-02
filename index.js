const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

//DB Connection
// const mysql = require('./db').con;
// const util = require('util');
// const exp = require('constants');
// // promisify the query method
// const myDB = util.promisify(mysql.query).bind(mysql);
const myDB = require('./db').query;

//config
app.use(express.json());
app.use(cors());



//routes
app.use('/api/v1/label', require('./route/labelRoute'))

//get label data
app.get('/allLabels',async(req,res)=>{
    const result = await myDB("SELECT * FROM label");
    res.json(result);
})

//add label data
app.post('/addLabel', async(req,res)=>{
    const {id, labelName,photoUrl} = req.body;
    const result = await myDB(`INSERT INTO label (id,labelName,photoUrl) VALUES(?,?,?) `,[id,labelName,photoUrl]);
    res.send(result);
})










//start
app.get('/',(req,res) =>{
    res.send('Node Mysql are running')
    })
    
    app.listen(port, (err)=>{
        if(err)
            throw err
        else
        console.log(`Server is running at PORT %d:`,port);
    })
    

    module.exports = myDB;