const express = require('express');
const { getAllLabels, addLabel, deleteLabel, updateLabel, getSingleLabel } = require('../controller/labelController');



// router object
const router = express.Router();


// All label routes

router.get('/allLabel', getAllLabels);

router.post('/addLabel', addLabel);

router.delete('/deleteLabel/:id', deleteLabel );

router.put('/updateLabel/:id', updateLabel);

router.get('/singleLabel/:id', getSingleLabel)


module.exports = router