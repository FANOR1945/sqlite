import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import useStyles from './styles';

function GenericHeader({ title, items = [], theme = 'default' }) {
  const styles = useStyles(theme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Maneja click de cada item
  const handleItemClick = (item) => {
    if (item.type === 'link' && item.sectionId) {
      const element = document.getElementById(item.sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else if (item.onClick) {
      item.onClick();
    }
    setMobileOpen(false); // Cierra menú móvil si estaba abierto
  };

  return (
    <header style={styles.root}>
      <div style={styles.content}>
        <div style={styles.left}>
          <h1 style={styles.title}>{title}</h1>

          {/* Botón hamburger para móvil */}
          {isMobile && (
            <button
              style={styles.hamburger}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}
        </div>

        {/* Menú desktop */}
        {!isMobile && (
          <div style={styles.right}>
            {items.map((item, index) => (
              <button
                key={index}
                style={item.type === 'link' ? styles.navBtn : styles.authBtn}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Menú móvil */}
      {isMobile && mobileOpen && (
        <div style={styles.mobileMenu}>
          {items.map((item, index) => (
            <button
              key={index}
              style={
                item.type === 'link'
                  ? styles.mobileNavBtn
                  : styles.mobileAuthBtn
              }
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default GenericHeader;
