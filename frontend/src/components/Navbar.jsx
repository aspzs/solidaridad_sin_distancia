import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Estilos inline actualizados para un aspecto más profesional
const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    height: '80px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
    borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
    transition: 'all 0.3s ease',
    display: 'block' // Asegurar que siempre sea visible
  },
  navScrolled: {
    height: '70px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
  },
  navTransparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderBottom: 'none'
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'height 0.3s ease'
  },
  containerScrolled: {
    height: '70px'
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  logo: {
    textDecoration: 'none',
    fontWeight: 700,
    color: '#1e40af', // Azul más oscuro para mayor profesionalismo
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.25rem',
    letterSpacing: '-0.02em',
    transition: 'color 0.3s ease',
    fontFamily: 'Arial, Helvetica, sans-serif' // Fuente Arial para encabezados
  },
  logoTransparent: {
    color: 'white'
  },
  logoIcon: {
    width: '20px',
    height: '20px',
    marginRight: '0.6rem'
  },
  desktopMenu: {
    display: 'none',
    alignItems: 'center',
    gap: '2rem'
  },
  mobileMenuBtn: {
    display: 'none', // Oculto por defecto, se mostrará solo en móviles vía media query
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: '#27272a' // Color de texto más oscuro
  },
  mobileMenuBtnTransparent: {
    color: 'white'
  },
  mobileMenu: {
    position: 'absolute',
    top: '80px',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
    borderRadius: '0 0 0.375rem 0.375rem',
    overflow: 'hidden'
  },
  mobileMenuScrolled: {
    top: '70px'
  },
  mobileMenuItem: {
    display: 'block',
    padding: '12px 16px',
    textDecoration: 'none',
    color: '#27272a', // Color de texto más oscuro
    borderLeft: '3px solid transparent',
    transition: 'all 0.2s ease',
    fontFamily: 'Arial, Helvetica, sans-serif' // Fuente Arial
  },
  mobileMenuItemActive: {
    borderLeftColor: '#1e40af', // Azul más oscuro
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    fontWeight: 500
  },
  navLink: {
    color: '#27272a', // Color de texto más oscuro
    fontWeight: 600,
    textDecoration: 'none',
    padding: '0.5rem 0.75rem',
    position: 'relative',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    letterSpacing: '0.01em',
    fontFamily: 'Arial, Helvetica, sans-serif' // Fuente Arial
  },
  navLinkTransparent: {
    color: 'rgba(255, 255, 255, 0.9)'
  },
  navLinkActive: {
    color: '#1e40af' // Azul más oscuro
  },
  navLinkActiveTransparent: {
    color: 'white'
  }
};

// Componente para enlaces de navegación en escritorio
const NavLink = ({ to, label, active, isScrolled }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Combinar estilos basados en el estado
  const linkStyle = {
    ...styles.navLink,
    ...(!isScrolled ? styles.navLinkTransparent : {}),
    ...(active && isScrolled ? styles.navLinkActive : {}),
    ...(active && !isScrolled ? styles.navLinkActiveTransparent : {})
  };
  
  // Estilo para la línea debajo del enlace
  const lineStyle = {
    position: 'absolute',
    bottom: '-3px',
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: isScrolled ? '#1e40af' : 'white', // Azul más oscuro
    transform: active || isHovered ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: isHovered && !active ? 'left' : 'right',
    transition: 'transform 0.3s ease'
  };

  return (
    <Link 
      to={to}
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
      <span style={lineStyle}></span>
    </Link>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Control de scroll para cambiar apariencia
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cierra menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Manejo de media query para mostrar/ocultar menú desktop y botón móvil
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    const handleMediaQueryChange = (e) => {
      const desktopMenu = document.getElementById('desktop-menu');
      const mobileBtn = document.querySelector('[aria-label="Abrir menú"], [aria-label="Cerrar menú"]');
      
      if (desktopMenu) {
        desktopMenu.style.display = e.matches ? 'flex' : 'none';
      }
      
      // Mostrar/ocultar el botón móvil según el tamaño de pantalla
      if (mobileBtn) {
        mobileBtn.style.display = e.matches ? 'none' : 'flex';
      }
    };
    
    // Aplicar inmediatamente
    handleMediaQueryChange(mediaQuery);
    
    // Listener para cambios
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  // Combinación de estilos basados en el estado
  const navStyle = {
    ...styles.nav,
    ...(isScrolled ? styles.navScrolled : styles.navTransparent)
  };
  
  const containerStyle = {
    ...styles.container,
    ...(isScrolled ? styles.containerScrolled : {})
  };
  
  const logoStyle = {
    ...styles.logo,
    ...(!isScrolled ? styles.logoTransparent : {})
  };
  
  const menuBtnStyle = {
    ...styles.mobileMenuBtn,
    ...(!isScrolled ? styles.mobileMenuBtnTransparent : {})
  };
  
  const mobileMenuStyle = {
    ...styles.mobileMenu,
    ...(isScrolled ? styles.mobileMenuScrolled : {})
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={styles.logoWrapper}>
          {/* Logo */}
          <Link to="/" style={logoStyle}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={styles.logoIcon}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Solidaridad Sin Fronteras</span>
          </Link>

          {/* Desktop Menu */}
          <div id="desktop-menu" style={styles.desktopMenu}>
            <NavLink 
              to="/" 
              label="Inicio" 
              active={location.pathname === '/'} 
              isScrolled={isScrolled} 
            />
            <NavLink 
              to="/blog" 
              label="Blog" 
              active={location.pathname === '/blog'} 
              isScrolled={isScrolled} 
            />
            <NavLink 
              to="/registros" 
              label="Registros" 
              active={location.pathname === '/registros'} 
              isScrolled={isScrolled} 
            />
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={menuBtnStyle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span aria-hidden="true">{isMenuOpen ? '×' : '☰'}</span>
          </button>
        </div>
        
        {/* Mobile Menu - Solo visible en móviles cuando está abierto */}
        {isMenuOpen && (
          <div style={mobileMenuStyle}>
            <Link 
              to="/" 
              style={{
                ...styles.mobileMenuItem,
                ...(location.pathname === '/' ? styles.mobileMenuItemActive : {})
              }}
            >
              Inicio
            </Link>
            <Link 
              to="/blog" 
              style={{
                ...styles.mobileMenuItem,
                ...(location.pathname === '/blog' ? styles.mobileMenuItemActive : {})
              }}
            >
              Blog
            </Link>
            <Link 
              to="/registros" 
              style={{
                ...styles.mobileMenuItem,
                ...(location.pathname === '/registros' ? styles.mobileMenuItemActive : {})
              }}
            >
              Registros
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;