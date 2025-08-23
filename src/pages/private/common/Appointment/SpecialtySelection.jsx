import { specialties } from '../../../../data';

const SpecialtySelection = ({ selectSpecialty }) => {
  return (
    <div className="list-container">
      <h3>Selecciona una especialidad</h3>
      <div className="items-list">
        {specialties.map(specialty => (
          <div key={specialty.id} className="list-item" onClick={() => selectSpecialty(specialty)}>
            <div className="item-info">
              <h4>{specialty.name}</h4>
              <p>{specialty.doctors} doctores disponibles</p>
            </div>
            <div className="item-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtySelection;