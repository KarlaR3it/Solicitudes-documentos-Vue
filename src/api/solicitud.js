import { v4 as uuidv4} from 'uuid';
import { SOLICITUDES } from '../utils/constants';
import size from 'lodash/size';
import remove from 'lodash/remove';

export function saveSolicitudApi(solicitudData) {
    const solicitudes = getSolicitudesApi();
    
    // Crear la solicitud completa con ID y timestamps
    const nuevaSolicitud = {
        id: uuidv4(),
        ...solicitudData,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    if (size(solicitudes) === 0) {
        const solicitudesArray = [nuevaSolicitud];
        localStorage.setItem(SOLICITUDES, JSON.stringify(solicitudesArray));
    } else {
        solicitudes.push(nuevaSolicitud);
        localStorage.setItem(SOLICITUDES, JSON.stringify(solicitudes));
    }
}
export function getSolicitudesApi() {
    const solicitudes = localStorage.getItem(SOLICITUDES);
    if(solicitudes) {
        return JSON.parse(solicitudes);
    }
    return [];
}

export function deleteSolicitudApi(idSolicitud) {
    const solicitudes = getSolicitudesApi();
    remove(solicitudes, function(solicitud) {
        return solicitud.id === idSolicitud;
    });
    localStorage.setItem(SOLICITUDES, JSON.stringify(solicitudes));
}