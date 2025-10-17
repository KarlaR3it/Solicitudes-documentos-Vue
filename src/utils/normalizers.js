/**
 * Utilidades para normalizar datos entre snake_case (backend) y camelCase (frontend)
 */

/**
 * Normaliza una solicitud de snake_case a camelCase
 * @param {Object} solicitud - Solicitud en formato snake_case
 * @returns {Object} Solicitud en formato camelCase
 */
export function normalizeSolicitud(solicitud) {
  if (!solicitud) return null;

  return {
    ...solicitud,
    // Campos que pueden venir en snake_case
    numeroVacantes: solicitud.numeroVacantes ?? solicitud.numero_vacantes,
    nivelExperiencia: solicitud.nivelExperiencia ?? solicitud.nivel_experiencia,
    baseEducacional: solicitud.baseEducacional ?? solicitud.base_educacional,
    conocimientosExcluyentes: solicitud.conocimientosExcluyentes ?? solicitud.conocimientos_excluyentes,
    rentaDesde: solicitud.rentaDesde ?? solicitud.renta_desde,
    rentaHasta: solicitud.rentaHasta ?? solicitud.renta_hasta,
    modalidadTrabajo: solicitud.modalidadTrabajo ?? solicitud.modalidad_trabajo,
    tipoServicio: solicitud.tipoServicio ?? solicitud.tipo_servicio,
    fechaInicioProyecto: solicitud.fechaInicioProyecto ?? solicitud.fecha_inicio_proyecto,
    usuarioId: solicitud.usuarioId ?? solicitud.usuario_id,
    createdAt: solicitud.createdAt ?? solicitud.created_at,
    updatedAt: solicitud.updatedAt ?? solicitud.updated_at,
  };
}

/**
 * Normaliza un documento de snake_case a camelCase
 * @param {Object} documento - Documento en formato snake_case
 * @returns {Object} Documento en formato camelCase
 */
export function normalizeDocumento(documento) {
  if (!documento) return null;

  return {
    ...documento,
    solicitudId: documento.solicitudId ?? documento.solicitud_id,
    nombreArchivo: documento.nombreArchivo ?? documento.nombre_archivo,
    createdAt: documento.createdAt ?? documento.created_at,
    updatedAt: documento.updatedAt ?? documento.updated_at,
  };
}

/**
 * Convierte un objeto de camelCase a snake_case (para enviar al backend)
 * @param {Object} obj - Objeto en camelCase
 * @returns {Object} Objeto en snake_case
 */
export function toSnakeCase(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Convertir camelCase a snake_case
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    result[snakeKey] = value;
  }

  return result;
}

/**
 * Convierte un objeto de snake_case a camelCase (desde el backend)
 * @param {Object} obj - Objeto en snake_case
 * @returns {Object} Objeto en camelCase
 */
export function toCamelCase(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Convertir snake_case a camelCase
    const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    result[camelKey] = value;
  }

  return result;
}
