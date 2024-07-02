const express = require('express');
const { getAllLabels } = require('../controller/labelController');


// router object
const router = express.Router();


// All label routes

router.get('/allLabel', getAllLabels)

module.exports = router