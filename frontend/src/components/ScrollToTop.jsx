import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Forzar el scroll al principio con un tiempo de espera para asegurarse de que la página está completamente cargada
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
    
    // Ejecutar inmediatamente y también después de un pequeño retraso para garantizar que funcione
    scrollToTop();
    setTimeout(scrollToTop, 100);
    
    // También añadir/eliminar una clase en el cuerpo para reiniciar cualquier estilo que pueda interferir
    document.body.classList.add('page-transition');
    
    setTimeout(() => {
      document.body.classList.remove('page-transition');
    }, 300);
    
  }, [pathname]);

  return null;
};

export default ScrollToTop;