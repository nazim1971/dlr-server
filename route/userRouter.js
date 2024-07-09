const express = require('express');
const { getAllUser, addUser, updateUser, deleteUser, login, logoutUser } = require('../controller/userController');


const router = express.Router();


router.get('/allUser', getAllUser);

router.post('/addUser', addUser);

router.post('/login', login);

router.post('/logout', logoutUser)

router.put('/updateUser/:userName', updateUser);

router.delete('/deleteUser/:userName', deleteUser);



module.exports = router;