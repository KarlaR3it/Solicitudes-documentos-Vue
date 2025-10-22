import { documentosClient } from './client';

const ENDPOINT = '/documentos';

/**
 * Obtener todos los documentos
 * @returns {Promise<Array>} Lista de documentos
 */
export const getDocumentosApi = async () => {
  const { data } = await documentosClient.get(ENDPOINT);
  return data;
};

/**
 * Obtener un documento por ID
 * @param {string|number} id - ID del documento
 * @returns {Promise<Object>} Documento encontrado
 */
export const getDocumentoByIdApi = async (id) => {
  const { data } = await documentosClient.get(`${ENDPOINT}/${id}`);
  return data;
};

/**
 * Obtener documentos asociados a una solicitud
 * @param {string|number} solicitudId - ID de la solicitud
 * @returns {Promise<Array>} Lista de documentos
 */
export const getDocumentosBySolicitudIdApi = async (solicitudId) => {
  const { data } = await documentosClient.get(`${ENDPOINT}/solicitud/${solicitudId}`);
  return data;
};

/**
 * Crear un nuevo documento
 * @param {Object} documentoData - Datos del documento
 * @returns {Promise<Object>} Documento creado
 */
export const saveDocumentoApi = async (documentoData) => {
  const { data } = await documentosClient.post(ENDPOINT, documentoData);
  return data;
};

/**
 * Actualizar un documento existente
 * @param {string|number} id - ID del documento
 * @param {Object} documentoData - Datos actualizados
 * @returns {Promise<Object>} Documento actualizado
 */
export const updateDocumentoApi = async (id, documentoData) => {
  const { data } = await documentosClient.patch(`${ENDPOINT}/${id}`, documentoData);
  return data;
};

/**
 * Eliminar un documento
 * @param {string|number} id - ID del documento
 * @returns {Promise<boolean>}
 */
export const deleteDocumentoApi = async (id) => {
  await documentosClient.delete(`${ENDPOINT}/${id}`);
  return true;
};
