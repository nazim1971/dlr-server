const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

//DB
const myDB = require('./db').query;

//config
app.use(express.json());
app.use(cors());



//routes
app.use('/v1/label', require('./route/labelRoute'))

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