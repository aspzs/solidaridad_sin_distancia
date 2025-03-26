import React, { useState, useEffect } from 'react';
import registroService from '../services/registroService';

const FormularioRegistro = ({ onRegistroAgregado }) => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    nacionalidad: '',
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toTimeString().split(' ')[0],
    // Campo honeypot oculto para detectar bots
    email_contacto: '' 
  });
  
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [animateSuccess, setAnimateSuccess] = useState(false);
  const [errors, setErrors] = useState({
    nombre: '',
    nacionalidad: '',
    captcha: ''
  });
  
  // Estado para captcha simple - opcional para ser menos estricto
  const [captcha, setCaptcha] = useState({
    value: '',
    code: '',
    required: false // Ahora el captcha es opcional inicialmente
  });
  
  // Estado para protección contra múltiples envíos
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(null);
  const [cooldown, setCooldown] = useState(false);
  
  // Lista de países para el selector
  const paises = [
    'Alemania', 'Arabia Saudita', 'Argentina', 'Australia', 'Bolivia', 'Brasil', 'Canadá', 'Chile', 'China', 'Colombia', 'Corea del Sur', 'Costa Rica',
    'Cuba', 'Ecuador', 'Egipto', 'El Salvador', 'España', 'Estados Unidos', 'Filipinas', 'Francia', 'Grecia', 'Guatemala', 'Honduras', 'India', 'Indonesia', 'Irán', 'Irlanda', 'Italia', 'Japón', 'Kenia', 'México',
    'Marruecos', 'Nicaragua', 'Nigeria', 'Noruega', 'Países Bajos', 'Palestina', 'Panamá', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'Reino Unido', 'República Dominicana', 'Rusia',
    'Sudáfrica', 'Suecia', 'Suiza', 'Tailandia', 'Turquía', 'Ucrania', 'Uruguay', 'Venezuela', 'Vietnam', 'Otro'
  ];
  
  
  
  // Generar captcha simple al cargar el componente y cuando se completa un envío
  useEffect(() => {
    // Generamos el captcha, pero solo lo requerimos después del tercer envío
    generateCaptcha();
    setCaptcha(prev => ({
      ...prev,
      required: submitCount >= 3
    }));
  }, [submitCount]);
  
  const generateCaptcha = () => {
    // Generar un código simple de 6 caracteres (letras y números)
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha({
      value: '',
      code: result
    });
  };
  
  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'nombre') {
      if (!value.trim()) {
        error = 'El nombre es obligatorio';
      } else if (value.trim().length < 3) {
        error = 'El nombre debe tener al menos 3 caracteres';
      } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.'-]+$/.test(value)) {
        // Más permisivo: permite letras, espacios, puntos, apóstrofes y guiones
        error = 'El nombre contiene caracteres no permitidos';
      }
    }
    
    if (name === 'nacionalidad') {
      if (!value) {
        error = 'Debe seleccionar una nacionalidad';
      }
    }
    
    if (name === 'captcha') {
      // Solo validamos el captcha si está activado
      if (captcha.required) {
        if (!value) {
          error = 'Por favor complete el captcha';
        } else if (value !== captcha.code) {
          error = 'El código ingresado no coincide';
        }
      }
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Si es el campo de captcha, actualizar ese estado específico
    if (name === 'captcha') {
      setCaptcha(prev => ({
        ...prev,
        value: value
      }));
    } else {
      setFormulario({
        ...formulario,
        [name]: value
      });
    }
    
    // Validar el campo cuando cambia
    validateField(name, value);
  };
  
  const checkForSpam = () => {
    // Verificar si el campo honeypot está lleno (lo que indicaría un bot)
    // Solo verificamos si tiene más de 3 caracteres para evitar falsos positivos
    if (formulario.email_contacto && formulario.email_contacto.length > 3) {
      return { isSpam: true, reason: 'Detección de bot' };
    }
    
    // Verificar si hay demasiados envíos en poco tiempo - menos estricto
    const now = new Date();
    if (lastSubmitTime) {
      const timeSinceLastSubmit = now - lastSubmitTime;
      
      // Reducido a 3 segundos para ser menos estricto (antes 10 segundos)
      if (timeSinceLastSubmit < 3000) {
        return { isSpam: true, reason: 'Por favor, no envíe registros tan rápidamente' };
      }
    }
    
    // Aumentado a 20 envíos (antes 5)
    if (submitCount >= 20) {
      return { isSpam: true, reason: 'Límite de envíos alcanzado' };
    }
    
    return { isSpam: false };
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar si estamos en período de enfriamiento
    if (cooldown) {
      setMensaje({
        texto: 'Por favor espere antes de enviar otro registro',
        tipo: 'error'
      });
      return;
    }
    
    // Verificar spam - menos estricto
    const spamCheck = checkForSpam();
    if (spamCheck.isSpam) {
      setMensaje({
        texto: `${spamCheck.reason}`,
        tipo: 'error'
      });
      
      // Activar período de enfriamiento más corto
      setCooldown(true);
      setTimeout(() => setCooldown(false), 10000); // Reducido a 10 segundos (antes 30)
      
      return;
    }
    
    // Validar todos los campos antes de enviar
    const nombreValid = validateField('nombre', formulario.nombre);
    const nacionalidadValid = validateField('nacionalidad', formulario.nacionalidad);
    // Solo validamos el captcha si está activo
    const captchaValid = captcha.required ? validateField('captcha', captcha.value) : true;
    
    // Si hay errores, no continuar
    if (!nombreValid || !nacionalidadValid || !captchaValid) {
      setMensaje({
        texto: 'Por favor corrija los errores en el formulario',
        tipo: 'error'
      });
      return;
    }
    
    try {
      setEnviando(true);
      setMensaje({ texto: '', tipo: '' });
      
      // Rastrear envíos
      setSubmitCount(prev => prev + 1);
      setLastSubmitTime(new Date());
      
      // Crear un objeto de datos sin el campo honeypot
      const { email_contacto, ...datosLimpios } = formulario;
      
      // Enviar datos a la API
      const respuesta = await registroService.crear(datosLimpios);
      
      // Tiempo mínimo para el estado de carga
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Limpiar formulario tras éxito
      setFormulario({
        nombre: '',
        nacionalidad: '',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toTimeString().split(' ')[0],
        email_contacto: ''
      });
      
      // Generar nuevo captcha
      generateCaptcha();
      
      // Restablecer errores
      setErrors({
        nombre: '',
        nacionalidad: '',
        captcha: ''
      });
      
      // Mostrar animación de éxito
      setAnimateSuccess(true);
      
      setTimeout(() => {
        setMensaje({
          texto: 'Registro agregado correctamente',
          tipo: 'exito'
        });
        
        // Desactivar la animación después de mostrarla
        setTimeout(() => {
          setAnimateSuccess(false);
        }, 800);
        
        // Notificar al componente padre
        if (onRegistroAgregado) {
          onRegistroAgregado();
        }
      }, 1200);
      
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mensajeError = error.response && error.response.data && error.response.data.mensaje 
        ? error.response.data.mensaje 
        : 'Error al enviar el formulario. Por favor intenta nuevamente.';
      
      setMensaje({
        texto: mensajeError,
        tipo: 'error'
      });
    } finally {
      setTimeout(() => {
        setEnviando(false);
      }, 2000);
    }
  };
  
  return (
    <div className="bg-registro rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mb-8 relative p-6">
      {/* Encabezado decorativo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <h1 className="text-xl font-serif font-bold text-black">Agregar Nuevo Registro</h1>
        <p className="text-black text-sm mt-1">
          Complete los datos para registrar una nueva persona
        </p>
      </div>
      
      {/* Contenido del formulario */}
      <div className="p-6">
        {mensaje.texto && (
          <div className={`p-4 mb-6 rounded-lg flex items-center ${
            mensaje.tipo === 'exito' ? 'bg-green-50 text-green-700 border-l-4 border-green-500' : 'bg-red-50 text-red-700 border-l-4 border-red-500'
          } transition-opacity duration-300 ease-in-out`}>
            <div className="mr-3">
              {mensaje.tipo === 'exito' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="font-medium">{mensaje.texto}</span>
          </div>
        )}
        
        {cooldown && (
          <div className="p-4 mb-6 rounded-lg bg-yellow-50 text-yellow-700 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Espere unos segundos antes de intentar nuevamente.</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="nombre">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                </div>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleChange}
                  disabled={enviando || cooldown}
                  className={`pl-10 w-full px-4 py-3 border ${
                    errors.nombre ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    enviando || cooldown ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder="Ingrese nombre completo (solo letras)"
                  required
                />
              </div>
              {errors.nombre && (
                <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
              )}
            </div>
            
            <div>
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="nacionalidad">
                 Nacionalidad <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">

                </div>
                <select
                  id="nacionalidad"
                  name="nacionalidad"
                  value={formulario.nacionalidad}
                  onChange={handleChange}
                  disabled={enviando || cooldown}
                  className={`pl-10 w-full px-4 py-3 border ${
                    errors.nacionalidad ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all duration-300 ${
                    enviando || cooldown ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  required
                >
                  <option value="">Seleccione una nacionalidad</option>
                  {paises.map((pais) => (
                    <option key={pais} value={pais}>
                      {pais}
                    </option>
                  ))}
                </select>

              </div>
              {errors.nacionalidad && (
                <p className="mt-1 text-sm text-red-600">{errors.nacionalidad}</p>
              )}
            </div>
            
            {/* Captcha simple - solo visible cuando es necesario */}
            {captcha.required && (
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="captcha">
                  Verificación de seguridad <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                  <div className="bg-gray-100 p-3 rounded-lg mb-3 md:mb-0 flex items-center justify-center" style={{ minWidth: '150px' }}>
                    <div className="select-none text-gray-700 font-mono text-lg tracking-widest" 
                        style={{ 
                          textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
                          background: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
                          padding: '0.5rem 1rem',
                          borderRadius: '4px',
                          letterSpacing: '0.25em',
                          transform: 'skew(-5deg)'
                        }}>
                      {captcha.code}
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      id="captcha"
                      name="captcha"
                      value={captcha.value}
                      onChange={handleChange}
                      disabled={enviando || cooldown}
                      className={`w-full px-4 py-3 border ${
                        errors.captcha ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                        enviando || cooldown ? 'bg-gray-100 cursor-not-allowed' : ''
                      }`}
                      placeholder="Ingrese el código mostrado"
                      required={captcha.required}
                    />
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      disabled={enviando || cooldown}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                </div>
                {errors.captcha && (
                  <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>
                )}
              </div>
            )}
            
            {/* Campo honeypot - realmente invisible para usuarios reales */}
            <div style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: '0',
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              borderWidth: '0',
              visibility: 'hidden',
              opacity: '0',
              pointerEvents: 'none'
            }} aria-hidden="true">
              <input
                type="text"
                id="website"
                name="email_contacto"
                value={formulario.email_contacto}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className={`relative px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ${
                  enviando || cooldown ? 'opacity-80 cursor-not-allowed' : ''
                }`}
                disabled={enviando || cooldown}
              >
                <span className={`inline-flex items-center transition-opacity duration-300 ${enviando ? 'opacity-0' : 'opacity-100'}`}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Enviar Registro
                </span>
                {enviando && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
            
            {/* Texto informativo de seguridad */}
            <div className="mt-4 border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500">
                <svg className="w-4 h-4 inline-block mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Este formulario está protegido contra spam y envíos automatizados. Para su seguridad, limitamos el número de registros.
              </p>
            </div>
          </div>
        </form>
      </div>
      
      {/* Pantalla completa de carga y animación de éxito */}
      {enviando && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center max-w-md w-full">
            {animateSuccess ? (
              <>
                <div className="text-green-500 transform scale-100 animate-bounce mb-4">
                  <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">¡Registro Exitoso!</h3>
                <p className="text-gray-600 text-center">El registro ha sido guardado correctamente.</p>
              </>
            ) : (
              <>
                <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Procesando</h3>
                <p className="text-gray-600 text-center">Estamos guardando su registro. Por favor espere...</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioRegistro;