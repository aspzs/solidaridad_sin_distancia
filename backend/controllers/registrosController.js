const registroModel = require('../models/registroModel');

// Controlador para gestionar registros
const registrosController = {
  // Obtener todos los registros
  obtenerTodos: async (req, res) => {
    try {
      const registros = await registroModel.obtenerTodos();
      res.status(200).json(registros);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener registros', error: error.message });
    }
  },

  // Obtener un registro por ID
  obtenerPorId: async (req, res) => {
    try {
      const id = req.params.id;
      const registro = await registroModel.obtenerPorId(id);
      
      if (!registro) {
        return res.status(404).json({ mensaje: `No se encontró registro con ID ${id}` });
      }
      
      res.status(200).json(registro);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener el registro', error: error.message });
    }
  },

  // Crear un nuevo registro
  crear: async (req, res) => {
    try {
      const { nombre, nacionalidad, fecha, hora } = req.body;
      
      // Validación básica
      if (!nombre || !nacionalidad || !fecha || !hora) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
      }
      
      const id = await registroModel.crear(req.body);
      res.status(201).json({ 
        mensaje: 'Registro creado exitosamente', 
        id: id 
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear el registro', error: error.message });
    }
  },

  // Actualizar un registro
  actualizar: async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, nacionalidad, fecha, hora } = req.body;
      
      // Validación básica
      if (!nombre || !nacionalidad || !fecha || !hora) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
      }
      
      const actualizado = await registroModel.actualizar(id, req.body);
      
      if (!actualizado) {
        return res.status(404).json({ mensaje: `No se encontró registro con ID ${id}` });
      }
      
      res.status(200).json({ mensaje: 'Registro actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar el registro', error: error.message });
    }
  },

  // Eliminar un registro
  eliminar: async (req, res) => {
    try {
      const id = req.params.id;
      const eliminado = await registroModel.eliminar(id);
      
      if (!eliminado) {
        return res.status(404).json({ mensaje: `No se encontró registro con ID ${id}` });
      }
      
      res.status(200).json({ mensaje: 'Registro eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el registro', error: error.message });
    }
  }
};

module.exports = registrosController;