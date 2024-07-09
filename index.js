const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;


//config
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    {
      origin: ["http://localhost:5173"],
      methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
      credentials: true,
      optionSuccessStatus: 200,  
    }
));


// verify jwt middlewire

const verifyUser = (req,res,next) =>{
  const token = req.cookies.token;
  if(!token){
    return res.json({Error: "You are not authenticated"})
  }
  else{
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
     if(err){
      return res.json({Error: "Token is not Correct"})
     }
     else{
      req.userEmail = decoded.userEmail;
      next();
     }
    })
  }
}

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
app.use('/v1/user', require('./route/userRouter'))
// All Artist
app.use('/v1/artist', require('./route/artistRoute.js'))

//start
app.get('/',(req,res) =>{
    res.send('Node Mysql are running')
    return res.json({Status: "Success", userEmail: req.userEmail})
    })
    
    app.listen(port, (err)=>{
        if(err)
            throw err
        else
        console.log(`Server is running at PORT %d:`,port);
    })
    
