const {query} = require('../db');

const artistTable = async ()=>{
    const sql = `
        CREATE TABLE IF NOT EXISTS artist (
            id INT AUTO_INCREMENT PRIMARY KEY,
            artistName TEXT,
            photoUrl TEXT
        )
    `;
    try {
        await query(sql);
        console.log('Artist Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

module.exports = {artistTable};