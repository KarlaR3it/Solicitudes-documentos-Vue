/**
 * Constantes para el módulo de Solicitudes
 * Centraliza las opciones de los formularios para facilitar mantenimiento
 */

export const ESTADOS_SOLICITUD = [
  'En Revisión',
  'Finalista',
  'Aprobada',
  'Rechazada',
  'Retirada',
];

export const AREAS = [
  'Tecnología',
  'Recursos Humanos',
  'Marketing',
  'Ventas',
  'Finanzas',
  'Operaciones',
  'Legal',
  'Administración',
  'Otra',
];

export const PAISES_LATAM = [
  'Argentina',
  'Bolivia',
  'Brasil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Ecuador',
  'El Salvador',
  'Guatemala',
  'Honduras',
  'México',
  'Nicaragua',
  'Panamá',
  'Paraguay',
  'Perú',
  'República Dominicana',
  'Uruguay',
  'Venezuela',
  'Otro',
];

export const NIVELES_EXPERIENCIA = [
  'Junior',
  'Semi Senior',
  'Senior',
  'Lead',
  'Manager',
];

export const MODALIDADES_TRABAJO = [
  'Presencial',
  'Remoto',
  'Híbrido',
];

export const TIPOS_SERVICIO = [
  'Tiempo Completo',
  'Medio Tiempo',
  'Por Proyecto',
  'Consultoría',
  'Freelance',
];

// Mapeo de estados a colores para tags
export const ESTADO_COLORS = {
  'En Revisión': 'info',
  'Finalista': 'warn',
  'Aprobada': 'success',
  'Rechazada': 'danger',
  'Retirada': 'secondary',
};
