import NestedModal from "../../../../components/nested/Modal";

const Confirmation = ({ 
  selectedDoctor, 
  selectedSpecialty, 
  selectedService, 
  selectedTime, 
  isGuest, 
  setSelectedTime, 
  openAuthModal, 
  handleConfirm 
}) => {
  return (
    <div className="confirmation-container">
      <NestedModal.Section>
        <h3>Resumen de tu cita</h3>
        <div className="reservation-summary">
          <p><strong>Doctor:</strong> {selectedDoctor.name}</p>
          {selectedSpecialty && <p><strong>Especialidad:</strong> {selectedSpecialty.name}</p>}
          {selectedService && <p><strong>Servicio:</strong> {selectedService.name}</p>}
          <p><strong>Horario:</strong> {selectedTime}</p>
          <p><strong>Estado:</strong> {isGuest ? 'Pendiente de registro' : 'Confirmada'}</p>
          
          {isGuest && (
            <div className="guest-warning">
              <p>⚠️ Reservarás como invitado. Deberás:</p>
              <ol>
                <li>Completar el registro en los próximos minutos</li>
                <li>Confirmar tu cita con tus datos personales</li>
                <li>Si no confirmas, tu cita se liberará en 24 horas</li>
              </ol>
            </div>
          )}
        </div>
      </NestedModal.Section>
      
      <NestedModal.Actions align="space-between">
        <button className="back-button" onClick={() => setSelectedTime(null)}>
          ← Volver
        </button>
        <button 
          className="confirm-button" 
          onClick={isGuest ? openAuthModal : handleConfirm}
        >
          {isGuest ? 'Continuar' : 'Reservar'}
        </button>
      </NestedModal.Actions>
    </div>
  );
};

export default Confirmation;