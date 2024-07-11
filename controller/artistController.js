const {query:myDB} = require('../db')


//get all artist by email
const getAllArtist = async(req,res)=>{
    const email = req.params.email;
    const result = await myDB("SELECT * FROM artist WHERE userEmail=?",[email]);
    res.json(result);
}


// get single artist by id
const getSingleArtist = async(req,res)=>{
 const id =req.params.id;
 const result = await myDB("SELECT * FROM artist WHERE id=?",[id]);
 res.send(result)
}

// Add New artist
const addArtist = async(req,res)=>{
    const {artistName,photoUrl,userEmail,artistEmail} = req.body;
    const result = await myDB(`INSERT INTO artist (artistName,photoUrl,userEmail,artistEmail) VALUES(?,?,?,?) `,[artistName,photoUrl,userEmail,artistEmail]);
    res.send(result);
}

// Delete artist by id
const deleteArtist = async(req,res)=>{
    const id = req.params.id;
    const result = await myDB(`DELETE FROM artist WHERE id=?`,[id]);
    res.send(result);
}

//Update data by id
const updateArtist = async(req,res)=>{
   const id = req.params.id;
   const {artistName,photoUrl,artistEmail,userEmail} = req.body;
   const result = await myDB("UPDATE artist SET artistName=?, photoUrl=?, artistEmail=?, userEmail=? WHERE id=?",[artistName,photoUrl,artistEmail,userEmail,id]);
   res.send(result)
}


module.exports = {getAllArtist, addArtist, deleteArtist, updateArtist, getSingleArtist};