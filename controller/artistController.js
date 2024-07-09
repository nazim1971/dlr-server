const {query:myDB} = require('../db')


//get all artist
const getAllArtist = async(req,res)=>{
    const result = await myDB("SELECT * FROM artist");
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
    const result = await myDB(`INSERT INTO artist (artistName,photoUrl,userEmail,artistEmail) VALUES(?,?,?,) `,[artistName,photoUrl,userEmail,artistEmail]);
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
   const {artistName,photoUrl,artistEmail} = req.body;
   const result = await myDB("UPDATE artist SET artistName=?, photoUrl=?, artistEmail=? WHERE id=?",[artistName,photoUrl,artistEmail,id]);
   res.send(result)
}


module.exports = {getAllArtist, addArtist, deleteArtist, updateArtist, getSingleArtist};