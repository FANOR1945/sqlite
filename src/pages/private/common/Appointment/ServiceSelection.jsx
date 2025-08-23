import { services } from '../../../../data';

const ServiceSelection = ({ selectService }) => {
  return (
    <div className="list-container">
      <h3>Selecciona un servicio</h3>
      <div className="items-list">
        {services.map(service => (
          <div key={service.id} className="list-item" onClick={() => selectService(service)}>
            <div className="item-info">
              <h4>{service.name}</h4>
              <p>{service.duration} - {service.price}</p>
            </div>
            <div className="item-arrow">→</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;