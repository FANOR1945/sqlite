// components/GenericCard.jsx
import './styles.css';

// GenericCard.jsx (ejemplo corregido)
const GenericCard = ({ icon, title, content, actions, theme = 'default', onClick, size = 'default', align = 'center' }) => {
  const cardClass = `card-reusable ${onClick ? 'clickable' : ''} card-${theme} card-${size} card-${align}`;
  
  return (
    <div className={cardClass} onClick={onClick}>
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <div className="card-content">
        {content}
      </div>
      {actions && actions.length > 0 && (
        <div className="card-actions">
          {actions.map((action, index) => (
            <button 
              key={index} 
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              className={`card-action-btn ${action.variant || 'primary'}`}
            >
              {action.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenericCard;