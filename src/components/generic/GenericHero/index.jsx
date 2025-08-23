// components/GeneriHero.jsx
import './styles.css';

const GeneriHero = ({ 
  title, 
  subtitle, 
  image, 
  ctaText, 
  onCtaClick, 
  children,
  imagePosition = 'right', // 'right', 'left', 'background', 'none'
  theme = 'default', // 'default', 'medical', 'minimal', 'dark'
  backgroundImage,
  overlay = false
}) => {
  return (
    <section className={`hero-reusable hero-${theme} ${overlay ? 'with-overlay' : ''}`} 
             style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}>
      
      <div className="hero-container">
        <div className={`hero-content image-${imagePosition}`}>
          <div className="text-content">
            <h1>{title}</h1>
            {subtitle && <p className="subtitle">{subtitle}</p>}
            {ctaText && (
              <button className="cta-button" onClick={onCtaClick}>
                {ctaText}
              </button>
            )}
            {children}
          </div>
          
          {image && imagePosition !== 'background' && imagePosition !== 'none' && (
            <div className="hero-visual">
              {typeof image === 'string' && image.startsWith('http') ? (
                <div className="image-container">
                  <img src={image} alt={title} />
                </div>
              ) : (
                <div className="icon-container">{image}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GeneriHero;