// components/GenericSection.jsx
import './styles.css';

const GenericSection = ({
  title,
  subtitle,
  children,
  theme = 'default', // 'default', 'light', 'dark', 'accent'
  columns = 1,
  id,
  className = ''
}) => {
  return (
    <section id={id} className={`section-reusable section-${theme} ${className}`}>
      <div className="section-container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2>{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
        )}
        
        <div className={`section-content columns-${columns}`}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default GenericSection;