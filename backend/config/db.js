const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a MySQL establecida correctamente');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error al conectar a la base de datos MySQL:', error);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
};