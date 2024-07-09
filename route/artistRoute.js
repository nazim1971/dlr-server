const express = require('express');
const { getSingleArtist, updateArtist, deleteArtist, addArtist, getAllArtist } = require('../controller/artistController');

const router = express.Router();


// All Artist routes

router.get('/allArtist', getAllArtist);

router.post('/addArtist', addArtist);

router.delete('/deleteArtist/:id', deleteArtist );

router.put('/updateArtist/:id', updateArtist);

router.get('/singleArtist/:id', getSingleArtist)


module.exports = router;