const OptionSelection = ({ openOption }) => {
  return (
    <div className="options-grid">
      <div className="option-card" onClick={() => openOption('Médico')}>
        <div className="option-icon">👨‍⚕️</div>
        <h3>Por Médico</h3>
        <p>Busca por nombre de doctor</p>
      </div>
      <div className="option-card" onClick={() => openOption('Especialidad')}>
        <div className="option-icon">🏥</div>
        <h3>Por Especialidad</h3>
        <p>Encuentra por tipo de especialidad médica</p>
      </div>
      <div className="option-card" onClick={() => openOption('Servicio')}>
        <div className="option-icon">📋</div>
        <h3>Por Servicio</h3>
        <p>Selecciona por tipo de servicio</p>
      </div>
    </div>
  );
};

export default OptionSelection;