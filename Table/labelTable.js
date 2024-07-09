const { query } = require('../db'); // Adjust the path as per your project structure

const labelTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS label (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userEmail TEXT,
            labelName TEXT,
            photoUrl TEXT
        )
    `;
    try {
        await query(sql);
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
};

module.exports = { labelTable };
