import { useState } from 'react';
import './App.css';
import { FaTrash, FaCheck, FaUndo, FaTimes, FaStethoscope, FaUserMd, FaPhone, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';

function App() {
  const [citas, setCitas] = useState([]);
  const [nuevaCita, setNuevaCita] = useState({
    paciente: '',
    doctor: 'Dra. Pérez',
    fecha: '',
    hora: '',
    sintomas: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoCita, setTipoCita] = useState('');

  // Datos de ejemplo para especialidades y médicos
  const especialidades = [
    { id: 1, nombre: 'Cardiología', icono: '❤️', descripcion: 'Especialistas en el cuidado del corazón' },
    { id: 2, nombre: 'Pediatría', icono: '👶', descripcion: 'Cuidado integral para niños' },
    { id: 3, nombre: 'Dermatología', icono: '🌟', descripcion: 'Cuidado de la piel y tratamientos estéticos' },
    { id: 4, nombre: 'Ginecología', icono: '🌸', descripcion: 'Salud femenina integral' },
    { id: 5, nombre: 'Ortopedia', icono: '🦴', descripcion: 'Especialistas en huesos y articulaciones' },
    { id: 6, nombre: 'Oftalmología', icono: '👁️', descripcion: 'Cuidado de la visión y ojos' }
  ];

  const medicos = [
    { id: 1, nombre: 'Dra. María Pérez', especialidad: 'Cardiología', experiencia: '15 años', foto: '👩‍⚕️' },
    { id: 2, nombre: 'Dr. Carlos García', especialidad: 'Pediatría', experiencia: '12 años', foto: '👨‍⚕️' },
    { id: 3, nombre: 'Dra. Laura López', especialidad: 'Dermatología', experiencia: '10 años', foto: '👩‍⚕️' },
    { id: 4, nombre: 'Dr. Roberto Martínez', especialidad: 'Ortopedia', experiencia: '18 años', foto: '👨‍⚕️' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCita({
      ...nuevaCita,
      [name]: value
    });
  };

  const agregarCita = (e) => {
    e.preventDefault();
    if (!nuevaCita.paciente || !nuevaCita.fecha || !nuevaCita.hora) {
      alert('Por favor, completa los campos obligatorios (Paciente, Fecha, Hora)');
      return;
    }
    const cita = {
      id: Date.now(),
      ...nuevaCita,
      completada: false
    };
    setCitas([...citas, cita]);
    setNuevaCita({ paciente: '', doctor: 'Dra. Pérez', fecha: '', hora: '', sintomas: '' });
    setMostrarFormulario(false);
  };

  const abrirModalOpciones = () => {
    setMostrarModal(true);
  };

  const seleccionarTipoCita = (tipo) => {
    setTipoCita(tipo);
    setMostrarModal(false);
    setMostrarFormulario(true);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="main-header">
        <div className="header-container">
          <div className="logo">
            <h1>🏥 Clínica Gran Potosí</h1>
          </div>
          <nav className="main-nav">
            <a href="#inicio">Inicio</a>
            <a href="#especialidades">Especialidades</a>
            <a href="#medicos">Médicos</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <button className="btn btn-primary" onClick={abrirModalOpciones}>
            Reservar Cita
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero-medico">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Cuidamos de tu salud con excelencia</h1>
            <p>Más de 20 años brindando atención médica de calidad con los mejores profesionales</p>
            <div className="hero-buttons">
              <button className="btn btn-large btn-primary" onClick={abrirModalOpciones}>
                Reservar Cita Online
              </button>
              <button className="btn btn-large btn-secondary">
                <FaPhone /> Llámanos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Especialidades */}
      <section id="especialidades" className="especialidades-section">
        <div className="container">
          <h2>Nuestras Especialidades</h2>
          <p className="section-subtitle">Contamos con las mejores especialidades médicas para tu cuidado integral</p>
          
          <div className="especialidades-grid">
            {especialidades.map(especialidad => (
              <div key={especialidad.id} className="especialidad-card">
                <div className="especialidad-icon">{especialidad.icono}</div>
                <h3>{especialidad.nombre}</h3>
                <p>{especialidad.descripcion}</p>
                <button className="btn btn-outline">Ver más</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Médicos */}
      <section id="medicos" className="medicos-section">
        <div className="container">
          <h2>Nuestro Equipo Médico</h2>
          <p className="section-subtitle">Profesionales altamente calificados para tu atención</p>
          
          <div className="medicos-grid">
            {medicos.map(medico => (
              <div key={medico.id} className="medico-card">
                <div className="medico-foto">{medico.foto}</div>
                <h3>{medico.nombre}</h3>
                <p className="medico-especialidad">{medico.especialidad}</p>
                <p className="medico-experiencia">{medico.experiencia} de experiencia</p>
                <button className="btn btn-primary">Solicitar Cita</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <section id="contacto" className="contacto-section">
        <div className="container">
          <h2>Contacto</h2>
          <div className="contacto-info">
            <div className="contacto-item">
              <FaMapMarkerAlt />
              <h3>Dirección</h3>
              <p>Av. Principal #123, Potosí</p>
            </div>
            <div className="contacto-item">
              <FaPhone />
              <h3>Teléfono</h3>
              <p>(02) 234-5678</p>
            </div>
            <div className="contacto-item">
              <FaClock />
              <h3>Horario</h3>
              <p>Lun-Vie: 8:00 - 18:00</p>
              <p>Sáb: 8:00 - 12:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <p>&copy; 2024 Clínica Gran Potosí. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Modal de Reservas (se mantiene igual) */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Selecciona el tipo de cita</h2>
              <button className="btn-close" onClick={() => setMostrarModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="cards-container">
                <div className="card-option" onClick={() => seleccionarTipoCita('especialidad')}>
                  <div className="card-icon">
                    <FaStethoscope />
                  </div>
                  <h3>Cita por Especialidad</h3>
                  <p>Elige entre nuestras especialidades médicas</p>
                </div>
                
                <div className="card-option" onClick={() => seleccionarTipoCita('medico')}>
                  <div className="card-icon">
                    <FaUserMd />
                  </div>
                  <h3>Cita por Médico</h3>
                  <p>Selecciona directamente a tu médico preferido</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de Citas (se mantiene oculto hasta que se seleccione una opción) */}
      {mostrarFormulario && (
        <div className="formulario-overlay">
          <div className="formulario-container">
            <form className="formulario-cita" onSubmit={agregarCita}>
              <div className="form-header">
                <h3>Reservar Cita</h3>
                <button type="button" className="btn-close" onClick={() => setMostrarFormulario(false)}>
                  <FaTimes />
                </button>
              </div>
              {/* ... (formulario existente) */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;