/**
 * Configuración centralizada de las APIs
 * 
 * Las URLs se obtienen de las variables de entorno (.env)
 * Para desarrollo local, recordar tener el archivo .env configurado
 */

export const API_CONFIG = {
  solicitudes: {
    baseURL: import.meta.env.VITE_API_SOLICITUDES_URL || 'http://localhost:8082',
    timeout: 10000, // 10 segundos
  },
  documentos: {
    baseURL: import.meta.env.VITE_API_DOCUMENTOS_URL || 'http://localhost:8083',
    timeout: 10000,
  },
};

// Validar que las URLs estén configuradas
if (!import.meta.env.VITE_API_SOLICITUDES_URL) {
  console.warn('⚠️ VITE_API_SOLICITUDES_URL no está configurada. Usando valor por defecto.');
}

if (!import.meta.env.VITE_API_DOCUMENTOS_URL) {
  console.warn('⚠️ VITE_API_DOCUMENTOS_URL no está configurada. Usando valor por defecto.');
}
