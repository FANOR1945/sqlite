import NestedModal from "../../../../components/nested/Modal";
const ScheduleDisplay = ({ selectedDoctor, continueToTimeSelection }) => {
  return (
    <NestedModal.Section>
      <div className="doctor-info">
        <div className="doctor-card">
          <div className="doctor-avatar">👨‍⚕️</div>
          <div className="doctor-details">
            <h2>{selectedDoctor.name}</h2>
            <p className="specialty">{selectedDoctor.specialty}</p>
            <p className="rating">⭐ {selectedDoctor.rating} (126 opiniones)</p>
          </div>
        </div>

        <div className="schedule-info">
          <h3>Horarios de atención</h3>
          {selectedDoctor.schedule.map((schedule, index) => (
            <div key={index} className="schedule-day">
              <span>{schedule.day}</span>
              <span>{schedule.hours}</span>
            </div>
          ))}
        </div>
      </div>

      <NestedModal.Actions align="center">
        <button className="confirm-button" onClick={continueToTimeSelection}>
          Ver Horarios Disponibles
        </button>
      </NestedModal.Actions>
    </NestedModal.Section>
  );
};

export default ScheduleDisplay;
