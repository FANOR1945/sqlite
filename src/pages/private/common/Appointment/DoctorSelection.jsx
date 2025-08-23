import { doctors } from '../../../../data';

const DoctorSelection = ({ selectedSpecialty, selectedService, selectDoctor }) => {
  let filteredDoctors = doctors;
  let title = "Selecciona un médico";
  
  if (selectedSpecialty) {
    filteredDoctors = doctors.filter(d => d.specialty === selectedSpecialty.name);
    title = `Doctores de ${selectedSpecialty.name}`;
  } else if (selectedService) {
    let relatedSpecialty = "General";
    if (selectedService.name.includes("Dental")) relatedSpecialty = "Odontología";
    
    filteredDoctors = doctors.filter(d => d.specialty === relatedSpecialty || relatedSpecialty === "General");
    title = `Doctores para ${selectedService.name}`;
  }

  return (
    <div className="list-container">
      <h3>{title}</h3>
      <div className="items-list">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="list-item" onClick={() => selectDoctor(doctor)}>
            <div className="item-info">
              <h4>{doctor.name}</h4>
              <p>⭐ {doctor.rating} - {doctor.specialty}</p>
            </div>
            <div className="item-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSelection;