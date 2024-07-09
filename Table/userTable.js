const { query } = require('../db'); // Adjust the path as per your project structure

const userTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userName TEXT,
            userEmail TEXT,
            password TEXT,
            token TEXT DEFAULT NULL,
            role TEXT DEFAULT 'user'
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

module.exports = { userTable };
