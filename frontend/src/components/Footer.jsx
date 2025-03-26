import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="footer-logo">Solidaridad Sin Fronteras</div>
            <p className="footer-text">
              Registro de Protestantes contra la violencia
            </p>
            <div className="flex items-center mt-4">
              <img src="public/icono_transparente.png" alt="Logo" className="w-12 h-12 mr-3" />
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="footer-links">
              <div className="footer-column">
                <h3 className="footer-heading">Información</h3>
                <ul className="footer-link-list">
                  <li><Link to="/aviso-privacidad" className="footer-link">Aviso de Privacidad</Link></li>
                  {/* <li><Link to="#" className="footer-link">Preguntas frecuentes</Link></li> */}
                  <li><a href='mailto:contacto@mail.com' className="footer-link">Contacto</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h3 className="footer-heading">Denuncias</h3>
                <ul className="footer-link-list">
                  <li><a href="https://www.cndh.org.mx/" target='_blank' className="footer-link">CNDH</a></li>
                  <li><a href="https://redtdt.org.mx/" target='_blank' className="footer-link">RedTDT</a></li>
                  <li><a href="https://www.fundacionjusticia.org/" target='_blank' className="footer-link">Fundación para la Justicia</a></li>
                  <li><a href="https://onc.org.mx/" target='_blank' className="footer-link">Observatorio Nacional Ciudadano</a></li>
                  <li><a href="https://amnistia.org.mx/contenido/" target='_blank' className="footer-link">Amnistía Internacional México</a></li>

                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} Contra violencia
          </div>
          <div className="footer-bottom-links">
            <Link to="/aviso-privacidad" className="footer-bottom-link">Política de privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;