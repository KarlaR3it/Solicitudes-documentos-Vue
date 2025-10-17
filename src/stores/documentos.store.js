import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

const API_URL = 'http://localhost:8083/documentos';

export const useDocumentosStore = defineStore('documentos', () => {
  // Estado
  const documentos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Obtener todos los documentos
  const fetchDocumentos = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(API_URL);
      documentos.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.message || 'Error al cargar documentos';
      console.error('Error fetching documentos:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Obtener documentos por solicitud ID
  const fetchDocumentosBySolicitud = async (solicitudId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${API_URL}/solicitud/${solicitudId}`);
      return response.data;
    } catch (err) {
      error.value = err.message || 'Error al cargar documentos de la solicitud';
      console.error('Error fetching documentos by solicitud:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Obtener un documento por ID
  const fetchDocumentoById = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (err) {
      error.value = err.message || 'Error al cargar el documento';
      console.error('Error fetching documento:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Crear nuevo documento
  const createDocumento = async (documentoData) => {
    loading.value = true;
    error.value = null;
    try {
      // Convertir camelCase a snake_case para el backend
      const payload = {
        solicitud_id: documentoData.solicitudId,
        extension: documentoData.extension,
        nombre_archivo: documentoData.nombreArchivo
      };
      
      const response = await axios.post(API_URL, payload);
      documentos.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = err.message || 'Error al crear el documento';
      console.error('Error creating documento:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Actualizar documento
  const updateDocumento = async (id, documentoData) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.patch(`${API_URL}/${id}`, documentoData);
      // Recargar todos los documentos para obtener la información completa con la solicitud
      await fetchDocumentos();
      return true;
    } catch (err) {
      error.value = err.message || 'Error al actualizar el documento';
      console.error('Error updating documento:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Eliminar documento
  const deleteDocumento = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`${API_URL}/${id}`);
      documentos.value = documentos.value.filter((d) => d.id !== id);
      return true;
    } catch (err) {
      error.value = err.message || 'Error al eliminar el documento';
      console.error('Error deleting documento:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Limpiar errores
  const clearError = () => {
    error.value = null;
  };

  return {
    // Estado
    documentos,
    loading,
    error,
    
    // Acciones
    fetchDocumentos,
    fetchDocumentosBySolicitud,
    fetchDocumentoById,
    createDocumento,
    updateDocumento,
    deleteDocumento,
    clearError,
  };
});
