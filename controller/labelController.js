const {query:myDB} = require('../db')


//get all label
const getAllLabels = async(req,res)=>{
    const result = await myDB("SELECT * FROM label");
    res.json(result);
}

// get single label by id
const getSingleLabel = async(req,res)=>{
 const id =req.params.id;
 const result = await myDB("SELECT * FROM label WHERE id=?",[id]);
 res.send(result)
}

// Add New label
const addLabel = async(req,res)=>{
    const {labelName,photoUrl,userEmail} = req.body;
    const result = await myDB(`INSERT INTO label (labelName,photoUrl,userEmail) VALUES(?,?,?) `,[labelName,photoUrl,userEmail]);
    res.send(result);
}

// Delete Label by id
const deleteLabel = async(req,res)=>{
    const id = req.params.id;
    const result = await myDB(`DELETE FROM label WHERE id=?`,[id]);
    res.send(result);
}

//Update data by id
const updateLabel = async(req,res)=>{
   const id = req.params.id;
   const {labelName,photoUrl} = req.body;
   const result = await myDB("UPDATE label SET labelName=?, photoUrl=? WHERE id=?",[labelName,photoUrl,id]);
   res.send(result)
}


module.exports = {getAllLabels, addLabel, deleteLabel, updateLabel, getSingleLabel};