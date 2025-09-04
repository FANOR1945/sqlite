import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import useForm from '../../../../hooks/useForm';

const validators = {
  nombre: (value) => {
    if (!value.trim()) return 'El nombre es requerido';
    if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
    return '';
  },
  apellido: (value) => {
    if (!value.trim()) return 'El apellido es requerido';
    if (value.length < 2) return 'El apellido debe tener al menos 2 caracteres';
    return '';
  },
  dni: (value) => {
    if (!value.trim()) return 'El DNI es requerido';
    if (value.length < 6) return 'El DNI debe tener al menos 6 caracteres';
    return '';
  },
  nacionalidad: (value) => {
    if (!value.trim()) return 'La nacionalidad es requerida';
    return '';
  },
  ciudad: (value) => {
    if (!value.trim()) return 'La ciudad es requerida';
    return '';
  },
  email: (value) => {
    if (!value) return 'El email es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Email inválido';
    return '';
  },
  password: (value) => {
    if (!value) return 'La contraseña es requerida';
    if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  },
  roleId: (value) => {
    if (!value) return 'Debe seleccionar un rol';
    return '';
  }
};

const Register = ({ onClose }) => {
  const { register, user, isLoading, error: authError } = useAuth();
  const [roles, setRoles] = useState([]);

  // Cargar roles disponibles al montar el componente
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://races-you-volume-suffered.trycloudflare.com/api/getAll?type=Role');
        if (response.ok) {
          const rolesData = await response.json();
          setRoles(rolesData);
  
          // Buscar el rol por alias
          const pacienteRole = rolesData.find(role => role.alias === 'paciente');
          if (pacienteRole) {
            setFormValues(prev => ({ ...prev, roleId: pacienteRole._id }));
          }
        }
      } catch (error) {
        console.error('Error al cargar roles:', error);
      }
    };
  
    fetchRoles();
  }, []);
  

  // Inicializamos roleId automáticamente según si hay usuario autenticado
  const initialValues = {
    nombre: '',
    apellido: '',
    dni: '',
    nacionalidad: '',
    ciudad: '',
    email: '',
    password: '',
    roleId: user ? '' : 'paciente' // si no hay user, rol paciente por defecto
  };

  const { formValues, errors, handleInputChange, resetForm, validateForm } = useForm(
    initialValues,
    validators
  );

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register({
        nombre: formValues.nombre,
        apellido: formValues.apellido,
        dni: formValues.dni,
        nacionalidad: formValues.nacionalidad,
        ciudad: formValues.ciudad,
        email: formValues.email,
        password: formValues.password,
        roleId: formValues.roleId
      });
      resetForm();
      onClose();
    } catch (error) {
      console.error('Register error:', error);
    }
  }, [formValues, register, validateForm, resetForm, onClose]);

  return (
    <form onSubmit={handleSubmit} noValidate>
      {authError && <div className="error-message">{authError}</div>}

      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={formValues.nombre}
          onChange={handleInputChange}
          required
        />
        {errors.nombre && <span className="error-text">{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="apellido">Apellido:</label>
        <input
          id="apellido"
          type="text"
          name="apellido"
          value={formValues.apellido}
          onChange={handleInputChange}
          required
        />
        {errors.apellido && <span className="error-text">{errors.apellido}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="dni">DNI:</label>
        <input
          id="dni"
          type="text"
          name="dni"
          value={formValues.dni}
          onChange={handleInputChange}
          required
        />
        {errors.dni && <span className="error-text">{errors.dni}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="nacionalidad">Nacionalidad:</label>
        <input
          id="nacionalidad"
          type="text"
          name="nacionalidad"
          value={formValues.nacionalidad}
          onChange={handleInputChange}
          required
        />
        {errors.nacionalidad && <span className="error-text">{errors.nacionalidad}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="ciudad">Ciudad:</label>
        <input
          id="ciudad"
          type="text"
          name="ciudad"
          value={formValues.ciudad}
          onChange={handleInputChange}
          required
        />
        {errors.ciudad && <span className="error-text">{errors.ciudad}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
        {errors.password && <span className="error-text">{errors.password}</span>}
      </div>

      {user && ( // solo si hay usuario autenticado se muestra el select de roles
        <div className="form-group">
          <label htmlFor="roleId">Tipo de usuario:</label>
          <select
            id="roleId"
            name="roleId"
            value={formValues.roleId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione su rol</option>
            {roles.map(role => (
              <option key={role._id} value={role._id}>
                {role.name || role.alias}
              </option>
            ))}
          </select>
          {errors.roleId && <span className="error-text">{errors.roleId}</span>}
        </div>
      )}

      <button type="submit" className="confirm-button full-width" disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Registrarse'}
      </button>
    </form>
  );
};

export default Register;