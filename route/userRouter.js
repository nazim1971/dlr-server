const express = require('express');
const { getAllUser, addUser, updateUser, deleteUser } = require('../controller/userController');

const router = express.Router();


router.get('/allUser', getAllUser);

router.post('/addUser', addUser);

router.put('/updateUser/:userName', updateUser);

router.delete('/deleteUser/:userName', deleteUser);

module.exports = router;