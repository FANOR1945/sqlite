// components/layout/Layout.jsx
import GenericHeader from '../generic/GenericHeader';
import GenericFooter from '../generic/GenericFooter';

function Layout({
  children,
  user,

  navItems,
  authItems,
}) {
  return (
    <div className='App'>
      {/* Header común */}
      <GenericHeader
        title='Gran Potosí'
        user={user}
        navItems={navItems}
        authItems={authItems}
        theme={user ? 'authenticated' : 'medical'}
      />

      {/* Contenido dinámico */}
      {children}

      {/* Footer solo si está autenticado */}
      {!user && (
        <GenericFooter
          companyName='MediReserva'
          tagline='Tu salud es nuestra prioridad'
          contact={{ phone: '(123) 456-7890', email: 'info@medireserva.com' }}
          hours={{
            weekdays: 'Lunes a Viernes: 8:00 - 20:00',
            weekends: 'Sábados: 9:00 - 14:00',
          }}
          copyright='© 2025 MediReserva. Todos los derechos reservados.'
        />
      )}
    </div>
  );
}

export default Layout;
