// src/components/generic/GenericForm.jsx
import { FaTimes } from 'react-icons/fa';
import './styles.css';

const GenericForm = ({ 
  title,
  formConfig,
  formValues, 
  onInputChange, 
  onSubmit, 
  onCancel,
  submitText = "Guardar",
  disabled = false
}) => {
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'date':
      case 'time':
      case 'email':
      case 'password':
      case 'number':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}{field.required && ' *'}</label>
            <input 
              type={field.type} 
              id={field.name}
              name={field.name}
              value={formValues[field.name] || ''}
              onChange={onInputChange}
              placeholder={field.placeholder}
              required={field.required}
              disabled={field.disabled}
              min={field.min}
              max={field.max}
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}{field.required && ' *'}</label>
            <select 
              id={field.name}
              name={field.name} 
              value={formValues[field.name] || ''}
              onChange={onInputChange}
              required={field.required}
              disabled={field.disabled}
            >
              {field.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'textarea':
        return (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}{field.required && ' *'}</label>
            <textarea 
              id={field.name}
              name={field.name}
              value={formValues[field.name] || ''}
              onChange={onInputChange}
              placeholder={field.placeholder}
              rows={field.rows || 3}
              required={field.required}
              disabled={field.disabled}
            ></textarea>
          </div>
        );
      case 'checkbox':
        return (
          <div key={field.name} className="form-group checkbox-group">
            <label htmlFor={field.name}>
              <input 
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={formValues[field.name] || false}
                onChange={onInputChange}
                disabled={field.disabled}
              />
              {field.label}
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form className="generic-form" onSubmit={onSubmit}>
      <div className="form-header">
        <h3>{title}</h3>
        <button type="button" className="btn btn-icon" onClick={onCancel} title="Cancelar" disabled={disabled}>
          <FaTimes />
        </button>
      </div>
      
      {formConfig.map(field => renderField(field))}
      
      <button type="submit" className="btn btn-success" disabled={disabled}>
        {submitText}
      </button>
    </form>
  );
};

export default GenericForm;