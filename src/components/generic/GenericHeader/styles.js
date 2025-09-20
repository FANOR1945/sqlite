import { useMemo } from 'react';

export default function useStyles(theme = 'ubuntu') {
  return useMemo(() => {
    const base = {
      root: {
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: '#fdf6e3', // fondo tipo Ubuntu
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'center',
      },
      content: {
        maxWidth: '1200px',
        width: '100%',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '@media (max-width: 768px)': {
          padding: '1rem',
        },
      },
      left: {
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        '@media (max-width: 768px)': {
          width: '100%',
          justifyContent: 'space-between',
        },
      },
      title: {
        margin: 0,
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#2e3436', // color de texto estilo Linux
        '@media (max-width: 768px)': {
          fontSize: '1.25rem',
        },
      },
      nav: {
        display: 'flex',
        gap: '1rem',
        '@media (max-width: 768px)': {
          display: 'none',
        },
      },
      navBtn: {
        background: 'none',
        border: 'none',
        fontSize: '1rem',
        fontWeight: 500,
        cursor: 'pointer',
        padding: '0.5rem 0.75rem',
        color: '#2e3436',
        transition: 'color 0.2s ease, transform 0.2s ease',
        ':hover': {
          color: '#4e9a06',
          transform: 'translateY(-2px)',
        },
      },
      right: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        '@media (max-width: 768px)': {
          display: 'none',
        },
      },
      authButtons: {
        display: 'flex',
        gap: '0.5rem',
      },
      authBtn: {
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500,
        border: '1px solid transparent',
        transition: 'all 0.2s ease',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      },
      loginBtn: {
        border: '1px solid #888a85',
        color: '#888a85',
        background: 'transparent',
      },
      registerBtn: {
        background: '#4e9a06',
        color: 'white',
        border: '1px solid #4e9a06',
      },
      userMenu: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      },
      welcomeText: {
        marginRight: '0.5rem',
      },
      hamburger: {
        display: 'block',
        fontSize: '1.5rem',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        color: '#2e3436',
        '@media (min-width: 769px)': {
          display: 'none !important',
        },
      },
      mobileMenu: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        background: '#fdf6e3',
        padding: '1.5rem',
        zIndex: 9999,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      },
      mobileNavBtn: {
        background: 'none',
        border: 'none',
        fontSize: '1.1rem',
        fontWeight: 500,
        cursor: 'pointer',
        padding: '0.75rem 0',
        color: '#2e3436',
        textAlign: 'left',
        width: '100%',
        ':hover': {
          color: '#4e9a06',
        },
      },
      mobileAuthSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1rem',
      },
      mobileUserSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      },
      mobileAuthBtn: {
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 500,
        border: '1px solid transparent',
        textAlign: 'center',
        width: '100%',
      },
      mobileLoginBtn: {
        border: '1px solid #888a85',
        color: '#888a85',
        background: 'transparent',
      },
      mobileRegisterBtn: {
        background: '#4e9a06',
        color: 'white',
        border: '1px solid #4e9a06',
      },
      mobileWelcomeText: {
        padding: '0.5rem 0',
        color: '#2e3436',
        fontWeight: 500,
      },
    };

    const themes = {
      ubuntu: {
        root: { ...base.root },
        title: { ...base.title },
        navBtn: { ...base.navBtn },
        hamburger: { ...base.hamburger },
        mobileMenu: { ...base.mobileMenu },
        mobileNavBtn: { ...base.mobileNavBtn },
        mobileWelcomeText: { ...base.mobileWelcomeText },
      },
    };

    return { ...base, ...(themes[theme] || {}) };
  }, [theme]);
}
