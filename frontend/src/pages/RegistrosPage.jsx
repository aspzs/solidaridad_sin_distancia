import React, { useState, useCallback } from 'react';
import FormularioRegistro from '../components/FormularioRegistro';
import RegistroTabla from '../components/RegistroTabla';

const RegistrosPage = () => {
  const [actualizarTabla, setActualizarTabla] = useState(0);
  
  // Función que se pasará al formulario para saber cuándo actualizar la tabla
  const handleRegistroAgregado = useCallback(() => {
    setActualizarTabla(prev => prev + 1);
  }, []);
  
  return (
    <div className="min-h-screen pt-24 pb-16">

<div className="bg-gradient-to-r from-blue-800 to-blue-600 py-16">
        <div className="container mx-auto px-6 text-center ">
          <h1 className="text-4xl font-serif font-bold text-white">Registro de Solidaridad y Memoria</h1>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
          Tu nombre es un acto de presencia y resistencia. Al registrarte, te sumas a una comunidad global que 
          rechaza la normalización de la violencia en México y exige justicia.
          </p>
        </div>
      </div>

      
      <div className="container mx-auto px-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel lateral con información */}
          <div className="pt-6 lg:col-span-1 order-2 lg:order-1">
            <div className="rounded-xl p-6 shadow-md overflow-hidden mb-8 bg-registro">
              <div className="p-6">
              <h1 className="">¿Por qué registrarse?</h1>
              <br></br>
                <p className="text-gray-700 mb-4">
                  Cada nombre registrado en esta plataforma representa:
                </p>
                <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">
                  <li>Un acto de memoria colectiva y resistencia contra el olvido de las víctimas</li>
                  <li>Una firma en nuestra petición internacional por justicia y transparencia</li>
                  <li>Tu compromiso con la visibilización de la violencia estructural en México</li>
                  <li>Una red de apoyo transnacional para comunidades afectadas</li>
                </ul>

              </div>
            </div>
            
            <div className="bg-registro p-6 rounded-xl shadow-md overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-4">
                <h1 className="">Datos y transparencia</h1>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-3">
                  Tu información está segura con nosotros:
                </p>
                <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">
                  <li>Solo recopilamos los datos mínimos necesarios para verificar la autenticidad de los registros</li>
                  <li>Los datos serán utilizados únicamente para los fines de esta iniciativa</li>
                </ul>
                <p className="text-gray-700">
                  El número total de registros y su distribución geográfica se actualiza diariamente en 
                  nuestra base de datos pública, sin revelar información personal.
                </p>
              </div>
            </div>
            
            
            <div className="bg-registro rounded-xl shadow-md overflow-hidden mb-8 p-6">
              <div className="bg-gradient-to-r from-blue-700 to-blue-800">
                <h1 className="">Preguntas frecuentes</h1>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">¿Quién puede registrarse?</h3>
                    <p className="text-gray-700">
                      Cualquier persona, independientemente de su nacionalidad o lugar de residencia, 
                      puede sumarse a esta iniciativa.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">¿Cómo se utilizarán los registros?</h3>
                    <p className="text-gray-700">
                      Los registros serán utilizados para demostrar la preocupación internacional sobre la 
                      violencia en México y ejercer presión sobre autoridades nacionales e internacionales.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">¿Mi registro me pone en riesgo?</h3>
                    <p className="text-gray-700">
                      No. Entendemos las preocupaciones de seguridad y hemos implementado protocolos 
                      robustos para proteger tu información. Puedes usar un seudónimo si lo prefieres.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">¿Puedo eliminar mi registro posteriormente?</h3>
                    <p className="text-gray-700">
                      Sí. Puedes solicitar la eliminación de tu registro en cualquier momento
                      contactando a nuestro equipo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-registro rounded-xl shadow-md overflow-hidden mb-8 p-6">
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-6 py-4">
                <h1 className="text-xl font-bold text-black">Soporte y contacto</h1>
                <p className="text-gray-700 mb-4">
                  Si necesitas asistencia o tienes preguntas sobre el proceso de registro:
                </p>
                <h3 className="font-semibold text-gray-800 mb-2">Contacto:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg> 
                      <span className='px-3'>contacto@solidaridadsinfronteras.com</span>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
          
          {/* Contenido principal - formulario y tabla */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Formulario de registro */}
            <FormularioRegistro onRegistroAgregado={handleRegistroAgregado} />
            
            
            {/* Tabla de registros */}
            <RegistroTabla key={actualizarTabla} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para las tarjetas de estadísticas
const StatCard = ({ number, label }) => (
  <div className="bg-blue-50 rounded-lg p-4 text-center">
    <div className="text-2xl font-bold text-blue-700">{number}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default RegistrosPage;