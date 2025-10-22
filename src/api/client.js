import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

/**
 * Crea una instancia de Axios con configuración base
 * @param {string} service - Nombre del servicio ('solicitudes' o 'documentos')
 */
const createApiClient = (service) => {
  const config = API_CONFIG[service];
  
  if (!config) {
    throw new Error(`Servicio "${service}" no configurado en API_CONFIG`);
  }

  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // ============================================
  // INTERCEPTOR DE REQUEST
  // ============================================
  client.interceptors.request.use(
    (config) => {
      // Log para debugging (solo en desarrollo)
      if (import.meta.env.DEV) {
        console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`);
      }
      return config;
    },
    (error) => {
      console.error('❌ Error en request:', error);
      return Promise.reject(error);
    }
  );

  // ============================================
  // INTERCEPTOR DE RESPONSE
  // ============================================
  client.interceptors.response.use(
    (response) => {
      // Log para debugging (solo en desarrollo)
      if (import.meta.env.DEV) {
        console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
      }
      return response;
    },
    (error) => {
      // Manejo centralizado de errores
      const message = error.response?.data?.message || error.message || 'Error desconocido';
      const status = error.response?.status;

      console.error(`❌ Error ${status || 'de red'}:`, message);

      // Mensajes amigables según el código de error
      const userMessage = getUserFriendlyMessage(status, message);
      
      // Agregar mensaje amigable al error
      error.userMessage = userMessage;
      
      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Convierte errores técnicos en mensajes amigables para el usuario
 */
const getUserFriendlyMessage = (status, technicalMessage) => {
  switch (status) {
    case 400:
      return 'Los datos enviados no son válidos. Por favor, revisa el formulario.';
    case 404:
      return 'El recurso solicitado no existe.';
    case 500:
      return 'Error en el servidor. Por favor, intenta nuevamente más tarde.';
    case 503:
      return 'El servicio no está disponible. Verifica que el backend esté corriendo.';
    default:
      if (!status) {
        return 'No se pudo conectar con el servidor. Verifica que el backend esté corriendo en el puerto correcto.';
      }
      return technicalMessage;
  }
};

// ============================================
// EXPORTAR CLIENTES CONFIGURADOS
// ============================================
export const solicitudesClient = createApiClient('solicitudes');
export const documentosClient = createApiClient('documentos');
