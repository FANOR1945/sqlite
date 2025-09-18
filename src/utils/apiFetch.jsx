// utils/apiFetch.js
const API_BASE_URL =
  'https://sacramento-extract-gen-salary.trycloudflare.com/api';

export async function apiFetch(url, method = 'GET', data = null, token = null) {
  try {
    // Usar token proporcionado o buscar en localStorage
    const authToken = token || localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
    };

    // Si hay token lo añadimos al header
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const options = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE_URL}${url}`, options);

    if (!response.ok) {
      let errorMsg = `Error ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) errorMsg = errorData.message;
        else if (errorData.error) errorMsg = errorData.error;
      } catch (_) {
        errorMsg = `${errorMsg}: ${response.statusText}`;
      }
      throw new Error(errorMsg);
    }

    // Para respuestas sin contenido (como logout)
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error en apiFetch:', error.message);
    throw error;
  }
}
