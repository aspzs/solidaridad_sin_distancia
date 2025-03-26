import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:5003/api/registros';

/**
 * Servicio para comunicarse con la API de registros
 */
const registroService = {
  /**
   * Obtiene todos los registros
   * @returns {Promise<Array>} Lista de registros
   */
  obtenerTodos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener registros:', error);
      throw error;
    }
  },
  
  /**
   * Obtiene un registro por su ID
   * @param {number} id - ID del registro a buscar
   * @returns {Promise<Object|null>} Registro encontrado o null
   */
  obtenerPorId: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      console.error(`Error al obtener registro con ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Crea un nuevo registro
   * @param {Object} datos - Datos del nuevo registro
   * @returns {Promise<Object>} Respuesta del servidor
   */
  crear: async (datos) => {
    try {
      const response = await axios.post(API_URL, datos);
      return response.data;
    } catch (error) {
      console.error('Error al crear registro:', error);
      throw error;
    }
  },
  
  /**
   * Actualiza un registro existente
   * @param {number} id - ID del registro a actualizar
   * @param {Object} datos - Datos actualizados
   * @returns {Promise<Object>} Respuesta del servidor
   */
  actualizar: async (id, datos) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, datos);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar registro con ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Elimina un registro
   * @param {number} id - ID del registro a eliminar
   * @returns {Promise<Object>} Respuesta del servidor
   */
  eliminar: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar registro con ID ${id}:`, error);
      throw error;
    }
  }
};

export default registroService;