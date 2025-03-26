import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Array con artículos de blog de ejemplo (mismo que en BlogPage)
  const blogPosts = [
    {
      id: 1,
      title: "La violencia sistémica en México y el caso de Teuchitlán",
      excerpt: "El caso de Teuchitlán, Jalisco, es un ejemplo de la violencia sistémica en México, donde colectivos de búsqueda han descubierto campos de exterminio mientras el Estado niega su responsabilidad.",
      date: "20 Marzo, 2025",
      author: "MUC",
      category: "Violencia y Sociedad",
      image: "https://placehold.co/800x450/e4e9f0/2d4ea3?text=Violencia+Sistémica+en+México",
      readTime: "4-5 min",
      content: `
      <br>


      <p>La violencia sistémica en México no es atribuible a un solo actor, sino que se encuentra arraigada en un sistema sociocultural que se manifiesta en diversas formas: desapariciones forzadas, asesinatos, desplazamiento de pueblos indígenas por el crimen organizado, participación de autodefensas, asaltos, inseguridad y la creciente presencia de grupos armados en la concentración de cárteles.

El caso de Teuchitlán, Jalisco, se ha convertido en un símbolo reciente de esta crisis. En marzo de 2025, el colectivo Guerreros Buscadores de Jalisco recibió una llamada anónima alertando sobre cuerpos en el rancho Izaguirre. Al llegar, encontraron más de 200 prendas, zapatos y objetos personales, además de restos humanos y un crematorio clandestino.
<br><br>
El sociólogo <strong>Raúl Romero</strong> destaca la gravedad de este hallazgo:

"El campo de adiestramiento y exterminio que halló recientemente el colectivo Guerreros Buscadores de Jalisco nos deja muchas lecciones, entre ellas; destaco dos. Que en México la desaparición de personas y la violencia criminal siguen siendo una realidad urgente por atender, una realidad que cuenta con la impunidad garantizada por distintos niveles del Estado. Y segundo: que son los colectivos y organizaciones de madres y familias buscadoras quienes están yendo a buscar a sus familias en los territorios. Ya sea en la CDMX, en Guadalajara, en el Estado de México, en Veracruz y en otros tantos lugares del país, más de 100 colectividades están buscando a sus seres queridos movidos con una hermosa y terrible consigna: ¡Porque los buscamos, porque los amamos! Ahí la dignidad en medio de la guerra” (Romero, R. 2025).
<p> <br>

<a href="https://www.jornada.com.mx/2025/03/13/opinion/014a2pol?fbclid=IwY2xjawJN1WxleHRuA2FlbQIxMQABHRU5o0-DvsWC-KJc1mt5LP3rCLuUh4WCg8GNz7zbRZO7RTANJ2yi11D-8A_aem__YwHcdXHPeBGrXYmCJANJw" target=_blank>Fuente: La Jornada</a>
<br></br>
<p>A pesar de la magnitud del hallazgo, la Fiscalía del Estado negó tener conocimiento previo del sitio, aunque informes revelaron que en septiembre de 2024, autoridades habían intervenido en el mismo lugar para liberar a dos personas secuestradas. La falta de sellos o cadenas que indicaran una intervención oficial sugiere negligencia por parte del gobierno.

Las organizaciones civiles continúan exigiendo justicia y señalando la responsabilidad del Estado en el aumento de la violencia. La pregunta que debemos hacernos es: <strong>¿Cuántos más? </strong></p>

      `
    },
    {
      id: 2,
      title: "Colectivos de búsqueda y la lucha contra la impunidad en México",
      excerpt: "Los colectivos de búsqueda han sido clave en la lucha contra la impunidad en México. A pesar de amenazas y campañas de desprestigio, siguen revelando la existencia de fosas clandestinas y la negligencia del gobierno.",
      date: "20 Marzo, 2025",
      author: "MUC",
      category: "Justicia y Derechos Humanos",
      image: "https://placehold.co/800x450/e0e7ff/4338ca?text=Colectivos+de+búsqueda",
      readTime: "3-4 min",
      content: `
      <br>
        <p>Los colectivos de búsqueda de desaparecidos han sido una pieza clave en la localización de personas y fosas clandestinas en México. En muchos casos, sus investigaciones han superado el trabajo de las autoridades, quienes han tratado de minimizar o politizar la crisis de violencia.

El caso de Teuchitlán, Jalisco, ejemplifica esta lucha. Luego del hallazgo del rancho Izaguirre, la Fiscalía intentó desacreditar el trabajo del colectivo Guerreros Buscadores de Jalisco. Sin embargo, las pruebas físicas y testimonios evidencian la negligencia del gobierno.
<br></br>
El periodista <strong>Hugo Esteve Díaz</strong> critica la postura de la administración actual, señalando que la respuesta de las autoridades ha sido intentar politizar el problema en lugar de asumir responsabilidad:

"A nadie puede extrañarle el desdén e indolencia que caracteriza la narrativa oficial con respecto a las víctimas de la descarnada violencia que padecemos desde hace tiempo y que tanto le ha incomodado al régimen, como si esas tragedias tuvieran como destinatario la ya de por sí desgastada figura gubernamental. [...] La respuesta siempre fue la misma: los culpables de la violencia y de su incremento no eran otros que los regímenes del pasado. [...] La incapacidad de reconocer y afrontar la severa crisis que padece el país en materia de seguridad pública pareciera reciclar la misma estrategia de construir su propia “verdad histórica”, una en la que el ex presidente López Obrador sea lavado de una imagen que desde ahora ya lo pinta de cuerpo entero: la de “narco-presidente” (Esteve, H. 2025). </p>
<br>
<a href="https://aristeguinoticias.com/230325/mexico/ezln-cni-y-organizaciones-repudian-campana-de-desprestigio-y-criminalizacion-contra-buscadoras/" target=_blank >Fuente: Aristegui Noticias</a>
<br></br>
<p>Los colectivos han denunciado recibir amenazas y campañas de desprestigio. A pesar de esto, continúan exigiendo justicia y revelando la existencia de más fosas de exterminio en diferentes estados del país. La periodista Iraís García expone estos descubrimientos en su investigación:</p>
<br></br>
<a href="https://e-veracruz.mx/nota/2025-03-12/estado/no-es-jalisco-es-veracruz-y-sus-campos-de-exterminio" target=_blank >Fuente: E-Veracruz</a>
<br></br>
<p>Este problema no es exclusivo de México. Nos queda preguntarnos:
<strong>¿Cuántos países viven lo mismo?</strong>
<strong>¿Cuántas fosas siguen sin descubrirse?</strong>
<strong>¿Cuántos casos han sido encubiertos por las autoridades?</strong>
</p>


<p>Cada fosa encontrada es una esperanza para las familias que buscan a sus seres queridos, pero también es una prueba del fracaso e impunidad del gobierno. <strong>No olvidemos que aún nos faltan 43.</strong></p>


`
    },
  ];
  
  useEffect(() => {
    // Simular carga de datos
    setLoading(true);
    
    // Buscar el post por ID
    const foundPost = blogPosts.find(post => post.id === parseInt(id));
    
    setTimeout(() => {
      if (foundPost) {
        setPost(foundPost);
      } else {
        // Si no se encuentra el post, redirigir al listado
        navigate('/blog');
      }
      setLoading(false);
    }, 800);
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-gray-50 flex justify-center items-center">
        <div className="animate-pulse text-center">
          <div className="h-8 w-64 bg-gray-300 rounded-md mx-auto mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded-md mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-10 bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Artículo no encontrado</h2>
          <p className="text-gray-600 mb-6">Lo sentimos, el artículo que buscas no existe o ha sido movido.</p>
          <Link to="/blog" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-10">
      {/* Header con imagen destacada */}
      <div className="w-full h-80 relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-blue-200 mt-2 max-w-4xl">{post.title}</h1>
        </div>
      </div>
      
      {/* Meta información */}
      <div className="container mx-auto px-6 md:flex md:items-center md:justify-between py-6 border-b border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
            {post.author.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">{post.author}</p>
            <p className="text-xs text-gray-500">{post.date}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime} lectura
          </span>
          

        </div>
      </div>
      
      {/* Contenido del artículo */}
      <div className="container mx-auto px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-blue max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          
          {/* Autor bio */}
          <div className="mt-10 p-6 bg-blue-50 rounded-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 text-2xl font-bold mb-4 md:mb-0 md:mr-6">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{post.author}</h3>
                <p className="text-gray-600 mt-2">
                  Socióloga egresada de la Universidad Autónoma Metropolitana (UAM).
                </p>
              </div>
            </div>
          </div>
          
          {/* Navegación entre artículos */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {post.id > 1 && (
              <Link 
                to={`/blog/${post.id - 1}`} 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-gray-700 font-medium">Artículo anterior</span>
              </Link>
            )}
            
            {post.id < blogPosts.length && (
              <Link 
                to={`/blog/${post.id + 1}`} 
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-end ml-auto"
              >
                <span className="text-gray-700 font-medium">Artículo siguiente</span>
                <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Artículos relacionados */}
      {/* <div className="container mx-auto px-6 py-10 border-t border-gray-200">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Artículos relacionados</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts
            .filter(relatedPost => relatedPost.id !== post.id && relatedPost.category === post.category)
            .slice(0, 3)
            .map(relatedPost => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="block group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                  <img 
                    src={relatedPost.image} 
                    alt={relatedPost.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {relatedPost.category}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default BlogDetailPage;