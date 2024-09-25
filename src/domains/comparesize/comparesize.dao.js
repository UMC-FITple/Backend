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

const createCompareSize = async (compareSizeData) => {
  const { size, totalLength, shoulderWidth, chestWidth, armholeWidth, sleeveWidth, sleeveLength, hemWidth } = compareSizeData;
  const [result] = await pool.query(
    'INSERT INTO compare_sizes (size, total_length, shoulder_width, chest_width, armhole_width, sleeve_width, sleeve_length, hem_width) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [size, totalLength, shoulderWidth, chestWidth, armholeWidth, sleeveWidth, sleeveLength, hemWidth]
  );
  return { id: result.insertId, ...compareSizeData };
};

const getCompareSizes = async () => {
  const [rows] = await pool.query('SELECT * FROM compare_sizes');
  return rows;
};

const getCompareSizeById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM compare_sizes WHERE id = ?', [id]);
  return rows[0];
};

const updateCompareSize = async (id, compareSizeData) => {
  const { size, totalLength, shoulderWidth, chestWidth, armholeWidth, sleeveWidth, sleeveLength, hemWidth } = compareSizeData;
  const [result] = await pool.query(
    'UPDATE compare_sizes SET size = ?, total_length = ?, shoulder_width = ?, chest_width = ?, armhole_width = ?, sleeve_width = ?, sleeve_length = ?, hem_width = ? WHERE id = ?',
    [size, totalLength, shoulderWidth, chestWidth, armholeWidth, sleeveWidth, sleeveLength, hemWidth, id]
  );
  return { id, ...compareSizeData };
};

const deleteCompareSize = async (id) => {
  await pool.query('DELETE FROM compare_sizes WHERE id = ?', [id]);
};

export default {
  createCompareSize,
  getCompareSizes,
  getCompareSizeById,
  updateCompareSize,
  deleteCompareSize,
};
