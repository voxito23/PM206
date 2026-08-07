import { Platform } from 'react-native';

const LOCAL_API_BASE_URL = Platform.OS === 'web'
  ? 'http://localhost:5000'
  : 'http://10.203.246.87:5000';

export const API_BASE_URL = (
  process.env.EXPO_PUBLIC_API_URL || LOCAL_API_BASE_URL
).replace(/\/+$/, '');

export const API_URL = `${API_BASE_URL}/v1/usuarios/`;

const API_TIMEOUT_MS = 10000;

export const apiFetch = async (path = '', options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    return await fetch(`${API_URL}${path}`, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

export const getApiErrorMessage = (error) => {
  if (error?.name === 'AbortError') {
    return `La API no respondió en 10 segundos (${API_BASE_URL}).`;
  }

  return `No se pudo conectar con ${API_BASE_URL}. Verifica que el celular y la computadora estén en la misma red Wi-Fi y que la API esté encendida.`;
};
