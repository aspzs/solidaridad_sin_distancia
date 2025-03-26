import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  // Array con artículos de blog actualizados
  const blogPosts = [
    {
      id: 1,
      title: "La violencia sistémica en México y el caso de Teuchitlán",
      excerpt: "El caso de Teuchitlán, Jalisco, es un ejemplo de la violencia sistémica en México, donde colectivos de búsqueda han descubierto campos de exterminio mientras el Estado niega su responsabilidad.",
      date: "20 Marzo, 2025",
      author: "MUC",
      category: "Violencia y Sociedad",
      image: "https://placehold.co/800x450/e4e9f0/2d4ea3?text=Violencia+Sistémica+en+México",
      readTime: "4-5 min"
    },
    {
      id: 2,
      title: "Colectivos de búsqueda y la lucha contra la impunidad en México",
      excerpt: "Los colectivos de búsqueda han sido clave en la lucha contra la impunidad en México. A pesar de amenazas y campañas de desprestigio, siguen revelando la existencia de fosas clandestinas y la negligencia del gobierno.",
      date: "20 Marzo, 2025",
      author: "MUC",
      category: "Justicia y Derechos Humanos",
      image: "https://placehold.co/800x450/e0e7ff/4338ca?text=Colectivos+de+búsqueda",
      readTime: "3-4 min"
    },
  
  ];

  const categories = [
    
  ];

  return (
    <div className="min-h-screen pt-24 pb-10 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-bold text-white">Espacio de Reflexión y Análisis</h1>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            Artículos, ensayos y testimonios que documentan, analizan y proponen alternativas ante 
            la violencia sistémica en México. Un archivo digital de memoria colectiva contra el olvido institucional.
          </p>
        </div>
      </div>

      {/* Categories - Movidos debajo del header */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category, index) => (
            <CategoryButton 
              key={index} 
              label={category} 
              active={category === "Todos"} 
            />
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination - Movida abajo con buen espaciado */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center space-x-2 pagination-controls">
            <PaginationButton disabled label="Anterior" />
            <PaginationNumber active label="1" />
            <PaginationNumber label="2" />
            <PaginationNumber label="3" />
            <PaginationButton label="Siguiente" />
          </div>
        </div>
      </div>

      {/* Newsletter */}
      {/* <div className="container mx-auto px-6 mt-16">
        <div className="bg-white rounded-xl shadow-md p-8 md:p-10 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-1 md:pr-10">
              <h3 className="text-2xl font-bold text-gray-900">Mantente informado</h3>
              <p className="mt-3 text-gray-700">
                Recibe mensualmente una selección de artículos, análisis y convocatorias para acciones 
                colectivas contra la violencia. Tu correo será tratado con confidencialidad.
              </p>
            </div>
            <div className="mt-6 md:mt-0 w-full md:w-96">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="flex-1 px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-5 py-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors duration-300">
                  Unir mi voz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Sección de Participación */}
      <div className="container mx-auto px-6 mt-16">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 md:p-10 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center">¿Quieres contribuir?</h3>
          <p className="mt-3 text-gray-700 text-center max-w-3xl mx-auto"><br></br>
            Este espacio está abierto a testimonios, análisis y propuestas. Si tienes una historia 
            que compartir o un análisis que ofrecer, contáctanos. Cada voz cuenta en este archivo 
            colectivo de memoria y resistencia.
          </p>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                          <a href='mailto:contacto@mail.com' className="btn">
                            contacto@solidaridadsinfronteras.com
                          </a>
                        </div>
        </div>
      </div>
    </div>
  );
};

// Componente de tarjeta de post de blog - Mejorado con colores más oscuros
const BlogPostCard = ({ post }) => (
  <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <img 
      src={post.image} 
      alt={post.title} 
      className="w-full object-cover"
    />
    <div className="p-6">
      <div className="flex items-center mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {post.category}
        </span>
        <span className="ml-auto text-gray-600 text-sm">{post.readTime} lectura</span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.excerpt}</p>
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
            {post.author.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{post.author}</p>
            <p className="text-xs text-gray-600">{post.date}</p>
          </div>
        </div>
        <Link to={`/blog/${post.id}`} className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
          Leer más →
        </Link>
      </div>
    </div>
  </article>
);

// Componente de botón de categoría
const CategoryButton = ({ label, active }) => (
  <button 
    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-white text-gray-800 hover:bg-gray-100'
    }`}
  >
    {label}
  </button>
);

// Componente de número de paginación
const PaginationNumber = ({ label, active }) => (
  <button 
    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-800 hover:bg-gray-100'
    }`}
  >
    {label}
  </button>
);

// Componente de botón de paginación
const PaginationButton = ({ label, disabled }) => (
  <button 
    className={`px-4 py-2 rounded-md flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
      disabled 
        ? 'text-gray-400 cursor-not-allowed' 
        : 'text-gray-800 hover:bg-gray-100'
    }`}
    disabled={disabled}
  >
    {label}
  </button>
);

export default BlogPage;