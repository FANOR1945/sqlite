// // pages/public/Home.jsx
// import GenericHero from '../../../components/generic/GenericHero';
// import GenericSection from '../../../components/generic/GenericSection';
// import GenericCard from '../../../components/generic/GenericCard';
// import GenericFooter from '../../../components/generic/GenericFooter';

// function Home({
//   openReservationModal,
//   isGuest,
//   openFullScreenModal,
//   onOpenAuthModal,
//   commonFooter,
// }) {
//   return (
//     <>
//       {/* Hero Section Reutilizable */}
//       <GenericHero
//         title='Reserva tu Cita Médica'
//         subtitle='Encuentra al especialista perfecto para tus necesidades de salud'
//         ctaText='Comenzar'
//         onCtaClick={openReservationModal}
//         image='🩺'
//         imagePosition='right'
//         theme='medical'
//       >
//         {isGuest && (
//           <p className='guest-notice'>
//             Puedes explorar como invitado, pero necesitarás
//             <button
//               className='text-link'
//               onClick={() => onOpenAuthModal('register')}
//             >
//               registrarte
//             </button>
//             para confirmar tu cita
//           </p>
//         )}
//       </GenericHero>

//       {/* Sección de información - Reutilizable */}
//       <GenericSection
//         id='como-funciona'
//         title='¿Cómo funciona?'
//         subtitle='Un proceso simple para agendar tu cita médica'
//         theme='light'
//         columns={3}
//       >
//         <GenericCard
//           icon='1'
//           title='Elige tu opción'
//           content='Selecciona entre médico, especialidad o servicio'
//           theme='medical'
//         />
//         <GenericCard
//           icon='2'
//           title='Encuentra disponibilidad'
//           content='Revisa los horarios disponibles para tu cita'
//           theme='medical'
//         />
//         <GenericCard
//           icon='3'
//           title='Confirma tu cita'
//           content='Completa el proceso y recibe tu confirmación'
//           theme='medical'
//         />
//       </GenericSection>

//       {/* Footer Reutilizable */}
//       {/* {commonFooter } */}
//     </>
//   );
// }

// export default Home;
// pages/public/Home.jsx
function Home({ children }) {
  return <>{children}</>;
}

export default Home;
