import React from 'react';
import { Link } from 'react-router-dom';

const AvisoPrivacidad = () => {
  return (
    <div className="min-h-screen pt-24 pb-10 bg-gray-50">
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-12 pt-6 mb-10 shadow-md">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Aviso de Privacidad</h1>
            <p className="text-lg text-blue-100 max-w-2xl pt-6 pb-10">
              Información sobre el tratamiento de datos personales de la iniciativa
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
            <div className="p-8">
              <section id="privacy-notice" className="mb-12">
                <div className="prose prose-blue max-w-none pt-6">
                  <p className="mb-4">
                    Comprometido con la protección de los datos personales de sus usuarios, 
                    emite el siguiente aviso de privacidad en cumplimiento de la normativa aplicable en materia de protección de datos.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">1. Responsable del tratamiento de datos</h3>
                  <p className="mb-4">
                    Solidaridad Sin Fronteras es el responsable del tratamiento de los datos personales recabados a través de este sitio web.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">2. Datos personales recabados</h3>
                  <p className="mb-2">
                    Para el registro en la plataforma, únicamente solicitamos los siguientes datos personales:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Nombre</li>
                    <li>Nacionalidad</li>
                  </ul>
                  <p className="mb-4">
                    No recabamos ni almacenamos datos sensibles ni información adicional sin el consentimiento explícito del usuario.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">3. Finalidad del tratamiento de datos</h3>
                  <p className="mb-2">
                    Los datos personales proporcionados serán utilizados exclusivamente para los siguientes fines:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Registrar la participación del usuario en la iniciativa.</li>
                    <li>Mostrar públicamente el nombre y nacionalidad en el archivo digital de la protesta.</li>
                    <li>Generar estadísticas anónimas sobre la participación en el proyecto.</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">4. Protección de los datos personales</h3>
                  <p className="mb-4">
                    Tomamos medidas de seguridad técnicas y organizativas para garantizar la protección de los datos 
                    personales y evitar su pérdida, acceso no autorizado o uso indebido.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">5. Derechos de los usuarios</h3>
                  <p className="mb-4">
                    Los usuarios tienen derecho a acceder, rectificar, cancelar u oponerse al uso de sus datos personales. 
                    Para ejercer estos derechos, pueden enviar una solicitud a través del correo electrónico proporcionado 
                    en la sección de contacto.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">6. Uso de cookies y tecnologías de rastreo</h3>
                  <p className="mb-4">
                    No utilizamos cookies ni tecnologías de rastreo para recopilar información adicional de los usuarios.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">7. Cambios en el aviso de privacidad</h3>
                  <p className="mb-4">
                    Cualquier cambio en este aviso de privacidad será publicado en este mismo sitio web.
                  </p>
                  
                  <p className="mt-8 mb-4">
                    Para más información o consultas, puedes contactarnos a través del correo electrónico indicado en la página.
                  </p>
                </div>
              </section>
              
              <div className="border-t border-gray-200 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-600 mb-4 md:mb-0">
                    Última actualización: 21 de marzo, 2025
                  </p>
                  <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Volver a la página principal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvisoPrivacidad;