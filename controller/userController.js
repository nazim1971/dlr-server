const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const {query:myDB} = require('../db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());


// Create user / Check User
const addUser = async(req,res)=>{

    //check user If Exist 
    const check = await myDB('SELECT * FROM user WHERE userEmail=?',[req.body.userEmail],async(err,data)=>{
        if(err) return res.status(500).json({Error: "Login error in server"});
            if(data.length) return res.status(409).json("user already Exist")

 // Create new user
    const {userName,userEmail,password} =req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password,salt)
    const result = await myDB(`INSERT INTO user (userName,userEmail,password) VALUES(?,?,?)`,[userName,userEmail,hash]);
    res.send(result);
    })
}

// login user 
const login = async(req,res)=>{
    const {password, userEmail} = req.body;

    myDB("SELECT * FROM user WHERE userEmail=? ",[userEmail],(err,data)=>{
        if(err) return res.json({Error: "Login error in server"});
        if(data.length > 0){
            // check password
            
            bcrypt.compare(password, data[0].password, (Byerr,Byres)=>{
                if(Byerr) return res.json({Error: "Wrong Password"});
                if(Byres){
                    const {password , ...others} = data[0]
                    const email = data[0].userEmail;
                    // jWt token 
                    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
                    res.cookie('token', token, { httpOnly: true }).json({Status: "Success",User:others});
                }
                else{return res.json({Status: "Wrong Password"})}
            })
        }
        else {
            return res.json({Status: "User Not Found"})
        }
    })
}

// logout user
const logoutUser = async (req,res)=>{
    res.clearCookie("token",{
        secure: true,
        sameSite: "none"
    }).json({Status: "Success"})
}

// Get all user
const getAllUser =async (req,res)=>{
    const result = await myDB('SELECT * FROM user');
    res.send(result)
   }

// Update user by email
const updateUser = async (req, res) => {
    const userName = req.params.userName;
    const { password } = req.body;
    
    try {
        const result = await myDB("UPDATE user SET password = ? WHERE userName = ?", [password, userName]);
        if (result.affectedRows === 0) {
            res.status(404).send('User not found');
        } else {
            res.send('Password updated successfully');
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
}


// Delete User by userName
const deleteUser = async (req,res)=>{
    const userName = req.params.userName;
    const result = await myDB("DELETE FROM user WHERE userName=?",[userName]);
    res.send(result);
}



module.exports = {getAllUser, addUser, updateUser, deleteUser, login, logoutUser}