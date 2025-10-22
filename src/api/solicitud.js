import { solicitudesClient } from './client';

const ENDPOINT = '/solicitudes';

/**
 * Crear una nueva solicitud
 * @param {Object} solicitudData - Datos de la solicitud
 * @returns {Promise<Object>} Solicitud creada
 */
export const saveSolicitudApi = async (solicitudData) => {
    const { data } = await solicitudesClient.post(ENDPOINT, solicitudData);
    return data;
};

/**
 * Obtener todas las solicitudes
 * @returns {Promise<Array>} Lista de solicitudes
 */
export const getSolicitudesApi = async () => {
    const { data } = await solicitudesClient.get(ENDPOINT);
    return data;
};

/**
 * Eliminar una solicitud
 * @param {string|number} idSolicitud - ID de la solicitud
 * @returns {Promise<boolean>}
 */
export const deleteSolicitudApi = async (idSolicitud) => {
    await solicitudesClient.delete(`${ENDPOINT}/${idSolicitud}`);
    return true;
};

/**
 * Actualizar una solicitud existente
 * @param {string|number} id - ID de la solicitud
 * @param {Object} solicitudData - Datos actualizados
 * @returns {Promise<Object>} Solicitud actualizada
 */
export const updateSolicitudApi = async (id, solicitudData) => {
    const { data } = await solicitudesClient.patch(`${ENDPOINT}/${id}`, solicitudData);
    return data;
};