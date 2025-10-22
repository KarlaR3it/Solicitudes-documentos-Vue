/**
 * Constantes para el módulo de Documentos
 * Centraliza las opciones y configuraciones relacionadas con documentos
 */

// Extensiones de archivo permitidas
export const EXTENSIONES_PERMITIDAS = ['pdf', 'docx', 'jpg', 'png'];

// Mapeo de extensiones a colores de tags (PrimeVue severity)
export const EXTENSION_COLORS = {
  pdf: 'danger',
  docx: 'info',
  jpg: 'success',
  png: 'success',
};

// Mapeo de extensiones a iconos de PrimeIcons
export const EXTENSION_ICONS = {
  pdf: 'pi-file-pdf',
  docx: 'pi-file-word',
  jpg: 'pi-image',
  png: 'pi-image',
};

// Función helper para obtener el color de una extensión
export const getExtensionColor = (extension) => {
  return EXTENSION_COLORS[extension] || 'secondary';
};

// Función helper para obtener el icono de una extensión
export const getExtensionIcon = (extension) => {
  return EXTENSION_ICONS[extension] || 'pi-file';
};
