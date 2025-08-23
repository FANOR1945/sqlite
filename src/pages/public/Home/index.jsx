// pages/public/Home.jsx
import GenericHero from '../../../components/generic/GenericHero';
import GenericSection from '../../../components/generic/GenericSection';
import GenericCard from '../../../components/generic/GenericCard';
import GenericFooter from '../../../components/generic/GenericFooter';

function Home({ openReservationModal, isGuest }) {
  return (
    <>
      {/* Banner con botones */}
      <div id="inicio" className="banner-section">
        <div className="banner-content">
          <h2>Bienvenido a nuestro servicio médico</h2>
          <p>Encuentra la mejor atención para tu salud</p>
          <div className="banner-buttons">
            <button 
              className="banner-btn primary"
              onClick={openReservationModal}
            >
              Reservar Cita
            </button>
            <button 
              className="banner-btn secondary"
              onClick={() => {
                // Scroll suave a la sección de servicios
                document.getElementById('servicios')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              Ver Servicios
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section Reutilizable */}
      <GenericHero
        title="Reserva tu Cita Médica"
        subtitle="Encuentra al especialista perfecto para tus necesidades de salud"
        ctaText="Reservar Cita Ahora"
        onCtaClick={openReservationModal}
        image="🩺"
        imagePosition="right"
        theme="medical"
      >
        {isGuest && (
          <p className="guest-notice">
            Puedes explorar como invitado, pero necesitarás registrarte para confirmar tu cita
          </p>
        )}
      </GenericHero>

      {/* Sección de información - Reutilizable */}
      <GenericSection
        id="como-funciona"
        title="¿Cómo funciona?"
        subtitle="Un proceso simple para agendar tu cita médica"
        theme="light"
        columns={3}
      >
        <GenericCard
          icon="1"
          title="Elige tu opción"
          content="Selecciona entre médico, especialidad o servicio"
          theme="medical"
        />
        <GenericCard
          icon="2"
          title="Encuentra disponibilidad"
          content="Revisa los horarios disponibles para tu cita"
          theme="medical"
        />
        <GenericCard
          icon="3"
          title="Confirma tu cita"
          content="Completa el proceso y recibe tu confirmación"
          theme="medical"
        />
      </GenericSection>

      {/* Sección de especialidades - Reutilizable */}
      <GenericSection
        id="servicios"
        title="Especialidades Destacadas"
        subtitle="Contamos con los mejores especialistas en cada área"
        columns={4}
      >
        <GenericCard
          icon="❤️"
          title="Cardiología"
          content="Expertos en salud cardiovascular"
        />
        <GenericCard
          icon="🦷"
          title="Odontología"
          content="Cuidado dental integral"
        />
        <GenericCard
          icon="👶"
          title="Pediatría"
          content="Especialistas en salud infantil"
        />
        <GenericCard
          icon="👁️"
          title="Dermatología"
          content="Cuidado de la piel especializado"
        />
      </GenericSection>

       {/* Footer Reutilizable (compartido para ambos estados) */}
      <GenericFooter
        companyName="MediReserva"
        tagline="Tu salud es nuestra prioridad"
        contact={{
          phone: "(123) 456-7890",
          email: "info@medireserva.com"
        }}
        hours={{
          weekdays: "Lunes a Viernes: 8:00 - 20:00",
          weekends: "Sábados: 9:00 - 14:00"
        }}
        copyright="© 2025 MediReserva. Todos los derechos reservados."
      />
    </>
  );
}

export default Home;