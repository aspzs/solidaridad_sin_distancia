const { pool } = require('../config/db');

class RegistroModel {
  // Obtener todos los registros
  async obtenerTodos() {
    try {
      const [rows] = await pool.query('SELECT * FROM registros ORDER BY id DESC');
      return rows;
    } catch (error) {
      console.error('Error al obtener registros:', error);
      throw error;
    }
  }

  // Obtener un registro por ID
  async obtenerPorId(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM registros WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error al obtener registro con ID ${id}:`, error);
      throw error;
    }
  }

  // Crear un nuevo registro
  async crear(registro) {
    try {
      const { nombre, nacionalidad, fecha, hora } = registro;
      const [result] = await pool.query(
        'INSERT INTO registros (nombre, nacionalidad, fecha, hora) VALUES (?, ?, ?, ?)',
        [nombre, nacionalidad, fecha, hora]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error al crear registro:', error);
      throw error;
    }
  }

  // Actualizar un registro
  async actualizar(id, registro) {
    try {
      const { nombre, nacionalidad, fecha, hora } = registro;
      const [result] = await pool.query(
        'UPDATE registros SET nombre = ?, nacionalidad = ?, fecha = ?, hora = ? WHERE id = ?',
        [nombre, nacionalidad, fecha, hora, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar registro con ID ${id}:`, error);
      throw error;
    }
  }

  // Eliminar un registro
  async eliminar(id) {
    try {
      const [result] = await pool.query('DELETE FROM registros WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar registro con ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = new RegistroModel();