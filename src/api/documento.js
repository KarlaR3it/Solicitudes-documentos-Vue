import axios from 'axios';

const API_URL = 'http://localhost:8083/documentos';

// Obtener todos los documentos
export async function getDocumentosApi() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error;
  }
}

// Obtener un documento por ID
export async function getDocumentoByIdApi(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener documento:', error);
    throw error;
  }
}

// Obtener documentos por solicitud ID
export async function getDocumentosBySolicitudIdApi(solicitudId) {
  try {
    const response = await axios.get(`${API_URL}/solicitud/${solicitudId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener documentos de la solicitud:', error);
    throw error;
  }
}

// Crear un nuevo documento
export async function saveDocumentoApi(documentoData) {
  try {
    const response = await axios.post(API_URL, documentoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear documento:', error);
    throw error;
  }
}

// Actualizar un documento
export async function updateDocumentoApi(id, documentoData) {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, documentoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar documento:', error);
    throw error;
  }
}

// Eliminar un documento
export async function deleteDocumentoApi(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    throw error;
  }
}
