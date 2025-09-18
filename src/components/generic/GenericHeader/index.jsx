import React, { useState } from 'react';
import useStyles from './styles';
import { FiMenu, FiX } from 'react-icons/fi';
import './styles.css'; // solo responsive
function GenericHeader({
  title,
  user,
  onLogin,
  onRegister,
  onProfile,
  onLogout,
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
        <div style={styles.left}>
          <h1 style={styles.title}>{title}</h1>

          {/* Navigation desktop */}
          {!user && (
            <nav
              style={{ ...styles.nav, display: 'flex' }}
              className='desktop-nav'
            >
              <button
                style={styles.navBtn}
                onClick={() => scrollToSection('inicio')}
              >
                Inicio
              </button>
              <button
                style={styles.navBtn}
                onClick={() => scrollToSection('como-funciona')}
              >
                ¿Cómo Funciona?
              </button>
              <button
                style={styles.navBtn}
                onClick={() => scrollToSection('servicios')}
              >
                Servicios
              </button>
            </nav>
          )}

          {/* Hamburger mobile */}
          <button
            style={styles.hamburger}
            className='hamburger-btn'
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div
          style={styles.right}
          className='desktop-auth'
        >
          {user ? (
            <div style={styles.userMenu}>
              <span>Bienvenido, {user.name}</span>
              <button
                style={styles.authBtn}
                onClick={onProfile}
              >
                Perfil
              </button>
              <button
                style={styles.authBtn}
                onClick={onLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className='auth-buttons'>
              <button
                style={{
                  ...styles.authBtn,
                  border: '1px solid #6c757d',
                  color: '#6c757d',
                }}
                onClick={onLogin}
              >
                Iniciar Sesión
              </button>
              <button
                style={{
                  ...styles.authBtn,
                  background: '#007bff',
                  color: 'white',
                  border: '1px solid #007bff',
                }}
                onClick={onRegister}
              >
                Registrarse
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={styles.mobileMenu}
          className='mobile-menu'
        >
          <button
            style={styles.navBtn}
            onClick={() => scrollToSection('inicio')}
          >
            Inicio
          </button>
          <button
            style={styles.navBtn}
            onClick={() => scrollToSection('como-funciona')}
          >
            ¿Cómo Funciona?
          </button>
          <button
            style={styles.navBtn}
            onClick={() => scrollToSection('servicios')}
          >
            Servicios
          </button>
          {!user && (
            <>
              <button
                style={{
                  ...styles.authBtn,
                  border: '1px solid #6c757d',
                  color: '#6c757d',
                }}
                onClick={onLogin}
              >
                Iniciar Sesión
              </button>
              <button
                style={{
                  ...styles.authBtn,
                  background: '#007bff',
                  color: 'white',
                  border: '1px solid #007bff',
                }}
                onClick={onRegister}
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default GenericHeader;
