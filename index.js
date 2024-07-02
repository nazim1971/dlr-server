const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = 8080;

//DB Connection
const mysql = require('./db').con;
const util = require('util');
const exp = require('constants');
// promisify the query method
const db = util.promisify(mysql.query).bind(mysql);

//config
app.use(express.json());
app.use(cors());


app.get('/allLabel',async(req,res)=>{
    const result = await db("SELECT * FROM label");
    res.json(result);
})

app.post('/addLabel', async(req,res)=>{
    const {id, labelName,photoUrl} = req.body;
    const result = await db(`INSERT INTO label (id,labelName,photoUrl) VALUES(?,?,?) `,[id,labelName,photoUrl]);
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
    