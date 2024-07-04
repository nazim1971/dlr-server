const {query:myDB} = require('../db');



// Get all user
const getAllUser =async (req,res)=>{
 const result = await myDB('SELECT * FROM user');
 res.send(result)
}

// Add a New User
const addUser = async(req,res)=>{
    const {userName,password} =req.body;
    const result = await myDB(`INSERT INTO user (userName,password) VALUES(?,?)`,[userName,password]);
    res.send(result);
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



module.exports = {getAllUser, addUser, updateUser, deleteUser}