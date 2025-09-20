import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import './styles.css';
import useStyles from './styles';

function GenericHeader({
  title,
  navItems = [],
  authItems = [],
  theme = 'medical',
}) {
  const styles = useStyles(theme);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header style={styles.root}>
      <div style={styles.content}>
        {/* izquierda */}
        <div style={styles.left}>
          <h1 style={styles.title}>{title}</h1>

          {/* Nav Desktop */}
          <nav
            style={{ ...styles.nav, display: 'flex' }}
            className='desktop-nav'
          >
            {navItems.map((item, idx) => (
              <button
                key={idx}
                style={styles.navBtn}
                onClick={() =>
                  item.sectionId
                    ? scrollToSection(item.sectionId)
                    : item.action?.()
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Hamburguesa */}
          <button
            style={styles.hamburger}
            className='hamburger-btn'
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* derecha */}
        <div
          style={styles.right}
          className='desktop-auth'
        >
          {authItems.map((item, idx) =>
            item.type === 'label' ? (
              <span key={idx}>{item.label}</span>
            ) : (
              <button
                key={idx}
                style={{
                  ...styles.authBtn,
                  ...(item.variant === 'primary'
                    ? {
                        background: '#007bff',
                        color: 'white',
                        border: '1px solid #007bff',
                      }
                    : { border: '1px solid #6c757d', color: '#6c757d' }),
                }}
                onClick={item.action}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <div
          style={styles.mobileMenu}
          className='mobile-menu'
        >
          {navItems.map((item, idx) => (
            <button
              key={idx}
              style={styles.navBtn}
              onClick={() =>
                item.sectionId
                  ? scrollToSection(item.sectionId)
                  : item.action?.()
              }
            >
              {item.label}
            </button>
          ))}

          {authItems.map((item, idx) =>
            item.type === 'label' ? (
              <span key={idx}>{item.label}</span>
            ) : (
              <button
                key={idx}
                style={{
                  ...styles.authBtn,
                  ...(item.variant === 'primary'
                    ? {
                        background: '#007bff',
                        color: 'white',
                        border: '1px solid #007bff',
                      }
                    : { border: '1px solid #6c757d', color: '#6c757d' }),
                }}
                onClick={item.action}
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </header>
  );
}

export default GenericHeader;
