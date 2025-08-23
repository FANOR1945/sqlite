// components/GenericFooter.jsx
import React from 'react';
import './styles.css';

const GenericFooter = ({ 
  companyName = "MediReserva", 
  tagline = "Tu salud es nuestra prioridad",
  contact = {
    phone: "(123) 456-7890",
    email: "info@medireserva.com"
  },
  hours = {
    weekdays: "Lunes a Viernes: 8:00 - 20:00",
    weekends: "Sábados: 9:00 - 14:00"
  },
  socialLinks = [
    { name: "Facebook", icon: "📘", url: "#" },
    { name: "Instagram", icon: "📷", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" }
  ],
  quickLinks = [
    { text: "Sobre Nosotros", url: "#" },
    { text: "Términos y Condiciones", url: "#" },
    { text: "Política de Privacidad", url: "#" },
    { text: "Preguntas Frecuentes", url: "#" }
  ],
  copyright = "© 2023 MediReserva. Todos los derechos reservados."
}) => {
  return (
    <footer className="generic-footer">
      <div className="footer-content">
        {/* Sección de información de la empresa */}
        <div className="footer-section">
          <h3>{companyName}</h3>
          <p>{tagline}</p>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.url} 
                className="social-link"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Sección de contacto */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <div className="contact-info">
            <p>📞 {contact.phone}</p>
            <p>✉️ {contact.email}</p>
          </div>
        </div>

        {/* Sección de horario */}
        <div className="footer-section">
          <h4>Horario</h4>
          <div className="hours-info">
            <p>{hours.weekdays}</p>
            <p>{hours.weekends}</p>
          </div>
        </div>

        {/* Sección de enlaces rápidos */}
        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul className="quick-links">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>

      
      </div>

      {/* Línea inferior del footer */}
      <div className="footer-bottom">
        <p>{copyright}</p>
        <div className="footer-bottom-links">
          <a href="#">Términos de Uso</a>
          <span className="separator">|</span>
          <a href="#">Política de Privacidad</a>
          <span className="separator">|</span>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default GenericFooter;