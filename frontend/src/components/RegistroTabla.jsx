import React, { useState, useEffect } from 'react';
import registroService from '../services/registroService';

const RegistroTabla = () => {
  // Estado para almacenar los datos
  const [registros, setRegistros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [fechaActual, setFechaActual] = useState('');
  const [horaActual, setHoraActual] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [filtroNacionalidad, setFiltroNacionalidad] = useState('');
  
  // Lista de nacionalidades únicas para el filtro
  const nacionalidadesUnicas = [...new Set(registros.map(reg => reg.nacionalidad))].sort();
  
  // Registros filtrados
  const registrosFiltrados = registros.filter(registro => {
    const coincideBusqueda = registro.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideNacionalidad = filtroNacionalidad === '' || registro.nacionalidad === filtroNacionalidad;
    return coincideBusqueda && coincideNacionalidad;
  });
  
  // Función para formatear la fecha
  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Efecto para cargar los datos al iniciar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const datos = await registroService.obtenerTodos();
        setRegistros(datos);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos: ' + (err.message || 'Error desconocido'));
        console.error('Error al cargar datos:', err);
      } finally {
        setCargando(false);
      }
    };
    
    // Establecer la fecha y hora actual
    const establecerFechaHora = () => {
      const ahora = new Date();
      
      // Formato de fecha: DD/MM/YYYY
      const dia = String(ahora.getDate()).padStart(2, '0');
      const mes = String(ahora.getMonth() + 1).padStart(2, '0');
      const anio = ahora.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anio}`;
      
      // Formato de hora: HH:MM:SS
      const horas = String(ahora.getHours()).padStart(2, '0');
      const minutos = String(ahora.getMinutes()).padStart(2, '0');
      const segundos = String(ahora.getSeconds()).padStart(2, '0');
      const horaFormateada = `${horas}:${minutos}:${segundos}`;
      
      setFechaActual(fechaFormateada);
      setHoraActual(horaFormateada);
    };
    
    cargarDatos();
    establecerFechaHora();
  }, []);
  
  // Función para manejar la limpieza de filtros
  const limpiarFiltros = () => {
    setBusqueda('');
    setFiltroNacionalidad('');
  };
  
  // Estados para UI interactiva
  const [hoveredRow, setHoveredRow] = useState(null);
  
  if (cargando) {
    return (
      <div className="flex justify-center items-center p-16 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-black text-lg font-medium">Cargando registros...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-8 bg-white rounded-xl shadow-lg">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Error al cargar datos</h3>
              <p className="mt-2 text-red-700">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-registro rounded-xl shadow-lg overflow-hidden">
      {/* Encabezado */}
      <div className="bg-registro from-blue-600 to-blue-800 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-xl font-serif font-bold text-black">Registros Actuales</h2>
          <p className="text-black text-sm mt-1">
            Total: {registrosFiltrados.length} registros
          </p>
        </div>
        <div className="text-right mt-3 md:mt-0">
          <p className="text-blue-100"><span className="font-medium">Fecha:</span> {fechaActual}</p>
          <p className="text-blue-100"><span className="font-medium">Hora:</span> {horaActual}</p>
        </div>
      </div>
      
      {/* Filtros */}
      {/* <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex-1 mb-3 md:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="mb-3 md:mb-0 md:w-64">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              value={filtroNacionalidad}
              onChange={(e) => setFiltroNacionalidad(e.target.value)}
            >
              <option value="">Todas las nacionalidades</option>
              {nacionalidadesUnicas.map(nac => (
                <option key={nac} value={nac}>{nac}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={limpiarFiltros}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpiar filtros
          </button>
        </div>
      </div> */}
      
      {/* Tabla de registros */}
      <div className="overflow-x-auto mb-16">
        {registrosFiltrados.length === 0 ? (
          <div className="text-center py-16 px-6">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-lg">No se encontraron registros que coincidan con los filtros.</p>
            <button
              onClick={limpiarFiltros}
              className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 focus:outline-none transition-colors"
            >
              Mostrar todos los registros
            </button>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nacionalidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrosFiltrados.map((registro) => (
                <tr 
                  key={registro.id} 
                  className={`transition-colors duration-200 ${hoveredRow === registro.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  onMouseEnter={() => setHoveredRow(registro.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{registro.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{registro.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {registro.nacionalidad}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatearFecha(registro.fecha)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{registro.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
    </div>
  );
};

export default RegistroTabla;