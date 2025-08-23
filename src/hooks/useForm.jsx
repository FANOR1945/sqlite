// src/hooks/useForm.js
import { useState } from 'react';

export const useForm = (initialState = {}, validators = {}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (validators[name]) {
      return validators[name](value);
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const resetForm = () => {
    setFormValues(initialState);
    setErrors({});
  };

  const setFieldValue = (name, value) => {
    const error = validateField(name, value);
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formValues).forEach(key => {
      const error = validateField(key, formValues[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formValues,
    errors,
    handleInputChange,
    resetForm,
    setFormValues,
    setFieldValue,
    validateForm
  };
};

export default useForm;