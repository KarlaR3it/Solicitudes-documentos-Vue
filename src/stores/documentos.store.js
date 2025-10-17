import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getDocumentosApi,
  getDocumentoByIdApi,
  getDocumentosBySolicitudIdApi,
  saveDocumentoApi,
  updateDocumentoApi,
  deleteDocumentoApi
} from '../api/documento';

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
      const data = await getDocumentosApi();
      documentos.value = data;
      return data;
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
      const data = await getDocumentosBySolicitudIdApi(solicitudId);
      return data;
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
      const data = await getDocumentoByIdApi(id);
      return data;
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
      const data = await saveDocumentoApi(documentoData);
      documentos.value.push(data);
      return data;
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
      await updateDocumentoApi(id, documentoData);
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
      await deleteDocumentoApi(id);
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
