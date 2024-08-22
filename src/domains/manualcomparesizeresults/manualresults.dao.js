import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


const getRealSize = async (clothId) => {
    const [rows] = await pool.query('SELECT * FROM real_size WHERE cloth_id = ?', [clothId]);
    return rows;
};


const getCompareSizes = async () => {
    const [rows] = await pool.query('SELECT * FROM compare_sizes');
    return rows;
};

export { getRealSize, getCompareSizes };
