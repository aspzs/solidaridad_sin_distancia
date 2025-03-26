import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Sección principal */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="md:flex items-center">
            <div className="md:w-1/2 max-w-3xl">
              <h1 className="hero-title">Solidaridad sin fronteras</h1>
              <h2 className="hero-subtitle">Un espacio de protesta, memoria y acción colectiva              </h2>
              <p className="hero-description">
              Alzamos la voz contra la normalización de la violencia en México. 
              <p className="hero-description">Este espacio nace como un acto de resistencia ante la impunidad, la injusticia y el olvido.</p>

Aquí documentamos casos, analizamos la violencia estructural y construimos redes de solidaridad transnacional. Buscamos visibilizar las problemáticas que afectan a miles de personas y exigir justicia.

Tu participación es fundamental. Registra tu nombre, comparte testimonios y sé parte de este movimiento de resistencia pacífica y en línea.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <Link to="/registros" className="btn btn-primary btn-icon">
                  Registra tu nombre aquí
                </Link>
                <Link to="/blog" className="btn btn-outline btn-icon">
                  Explora los artículos
                </Link>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de contexto */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">El horror de Teuchitlán: Un llamado a la acción</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            El 5 de marzo de 2025, el colectivo Guerreros Buscadores de Jalisco descubrió un campo de exterminio en un rancho de Teuchitlán. Entre restos calcinados y más de 200 objetos personales, se evidenció una vez más la crisis de violencia e impunidad que azota a México.
            </p>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Este hallazgo no es un hecho aislado. Se suma a las más de 100,000 personas desaparecidas y cientos de miles de asesinatos que el Estado ha ignorado. La impunidad alcanza el 97%, dejando a las familias solas en la búsqueda de justicia.
            </p>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Desde esta plataforma, visibilizamos la realidad de Teuchitlán y de tantos otros lugares marcados por la violencia. Documentamos casos, recopilamos testimonios y construimos un archivo de memoria colectiva contra el olvido institucional.
            </p>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            La distancia geográfica no significa indiferencia; al contrario, nos permite tejer una red internacional de apoyo y resistencia. Te invitamos a registrar tu nombre como un acto simbólico de solidaridad y compromiso.
            </p>

            











          </div>
        </div>
      </section>

      {/* Sección de pilares */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold">¿Qué sostiene al proyecto?</h3>
            <ul className="list-disc pl-6 text-gray-700 mt-4">
              <li><strong>Legitimidad moral:</strong> La violencia no es natural ni inevitable. Las 125,287 personas desaparecidas en México son prueba de una crisis que debe ser confrontada desde todos los espacios posibles.</li>
              <li><strong>Solidaridad transnacional:</strong> La diáspora mexicana y aliados internacionales crean una red de apoyo que trasciende fronteras.</li>
              <li><strong>Espacio de aprendizaje comunitario:</strong> Con colaboraciones de la comunidad, apoyo, e información se abre un espacio de aprendizaje comunitario .</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">¿Qué busca lograr?</h3>
            <ul className="list-disc pl-6 text-gray-700 mt-4">
              <li><strong>Archivo digital:</strong> Crear un archivo digital colaborativo sobre la violencia en México con enfoque transnacional, documentando y generando al menos 100 casos e investigaciones con lenguaje que todes podamos entender para el 2026.</li>
              <li><strong>Comunidad de acción:</strong> Establecer una red de personas comprometidas con acciones concretas contra la violencia, desde la divulgación hasta la incidencia política.</li>
              <li><strong>Incidencia política:</strong> Presentar en foros internacionales y ante organismos de derechos humanos los casos documentados, presionando por un reconocimiento oficial de la crisis de violencia como problema estructural.</li>
              <li><strong>Narrativa alternativa:</strong> Contrarrestar el discurso que normaliza la violencia a través de producción cultural, artística y periodística que humanice a las víctimas y visibilice las causas sistémicas.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sección de testimonios */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12">Voces que resisten</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-700 mb-4">
                "Mi hermano desapareció hace tres años en Tamaulipas. Las autoridades nunca hicieron nada. Este espacio me ha permitido mantener viva su memoria y conectar con otras familias en búsqueda."
              </p>
              <p className="font-medium text-right">- María G., Monterrey</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-700 mb-4">
                "Desde Barcelona, este proyecto me ha permitido seguir luchando por mi país. La distancia física no significa olvido ni indiferencia."
              </p>
              <p className="font-medium text-right">- Carlos M., catalán de origen mexicano</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-gray-700 mb-4">
                "Como académica alemana especializada en derechos humanos, he encontrado en esta iniciativa un valioso recurso para entender la complejidad de la violencia en México y sus conexiones globales."
              </p>
              <p className="font-medium text-right">- Hannah K., Universidad de Múnich</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Sección de próximos eventos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-12">Súmate a nuestras actividades</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-blue-200 p-6 rounded-lg">
              <div className="text-blue-600 font-bold mb-2">Por anunciar...</div>

            </div>
            {/* <div className="border border-blue-200 p-6 rounded-lg">
              <div className="text-blue-600 font-bold mb-2">20 de mayo, 2025</div>
              <h3 className="text-lg font-semibold mb-2">Taller presencial en Múnich</h3>
              <p className="text-gray-700">
                "Documentación de casos de violencia con perspectiva de derechos humanos".
              </p>
            </div>
            <div className="border border-blue-200 p-6 rounded-lg">
              <div className="text-blue-600 font-bold mb-2">2 de junio, 2025</div>
              <h3 className="text-lg font-semibold mb-2">Presentación de informe</h3>
              <p className="text-gray-700">
                "Violencia estructural en México: análisis de 50 casos emblemáticos" en el Parlamento Europeo, Bruselas.
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* El Footer se renderiza como componente separado */}
      {/* <Footer /> */}
      {/* Nota: El componente Footer está comentado porque normalmente se renderizaría desde el App.jsx para todas las páginas */}
    </div>
  );
};

export default HomePage;