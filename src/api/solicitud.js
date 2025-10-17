import axios from 'axios';

const API_URL = 'http://localhost:8082/solicitudes';

// Crear una nueva solicitud
export async function saveSolicitudApi(solicitudData) {
    try {
        const response = await axios.post(API_URL, solicitudData);
        return response.data;
    } catch (error) {
        console.error('Error al guardar solicitud:', error);
        throw error;
    }
}

// Obtener todas las solicitudes
export async function getSolicitudesApi() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        throw error;
    }
}

// Eliminar una solicitud
export async function deleteSolicitudApi(idSolicitud) {
    try {
        await axios.delete(`${API_URL}/${idSolicitud}`);
        return true;
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        throw error;
    }
}

// Actualizar una solicitud
export async function updateSolicitudApi(id, solicitudData) {
    try {
        const response = await axios.patch(`${API_URL}/${id}`, solicitudData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar solicitud:', error);
        throw error;
    }
}