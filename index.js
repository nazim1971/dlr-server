const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;


//config
app.use(express.json());
app.use(cors());

//MiddleWire
app.post('/jwt',async(req,res)=>{
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '365d'});
    res.send({token});
  })

//all table
const {labelTable} = require('./Table/labelTable');
const {artistTable} = require('./Table/artistTable');
const {userTable} = require('./Table/userTable.js');

// labelTable
const initializeDatabase = async () => {
    try {
        await labelTable();
        await artistTable();
        await userTable();
        console.log('Label table checked/created');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};
initializeDatabase();

//routes
//label
app.use('/v1/label', require('./route/labelRoute'))
// All User 
app.use('/v01/user', require('./route/userRouter'))



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
    

