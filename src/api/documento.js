// API para el microservicio de Documentos (Puerto 8083)
const API_BASE_URL = 'http://localhost:8083';

// Función para obtener todos los documentos
export function getDocumentosApi() {
  // Datos mock temporales - reemplazar con llamada real a la API
  return [
    {
      id: 1,
      nombre: "CV_Juan_Perez.pdf",
      tipo: "CV/Currículum",
      descripcion: "Currículum vitae actualizado",
      solicitudId: 1,
      fechaCreacion: "2024-01-15",
      tamaño: "2.5 MB",
      estado: "Activo"
    },
    {
      id: 2,
      nombre: "Certificado_Desarrollo_Web.pdf", 
      tipo: "Certificados",
      descripcion: "Certificado de curso de desarrollo web fullstack",
      solicitudId: 1,
      fechaCreacion: "2024-01-16",
      tamaño: "1.2 MB",
      estado: "Activo"
    },
    {
      id: 3,
      nombre: "Portafolio_Proyectos.zip",
      tipo: "Portafolio", 
      descripcion: "Archivo con proyectos destacados",
      solicitudId: 2,
      fechaCreacion: "2024-01-17",
      tamaño: "15.8 MB",
      estado: "Activo"
    }
  ];
}

// Función para obtener un documento por ID
export function getDocumentoByIdApi(id) {
  const documentos = getDocumentosApi();
  return documentos.find(doc => doc.id === parseInt(id));
}

// Función para obtener documentos por solicitud ID
export function getDocumentosBySolicitudIdApi(solicitudId) {
  const documentos = getDocumentosApi();
  return documentos.filter(doc => doc.solicitudId === parseInt(solicitudId));
}

// Función para crear un nuevo documento
export function saveDocumentoApi(documento) {
  // Simular guardado - reemplazar con llamada real a POST /documentos
  const newDocumento = {
    ...documento,
    id: Date.now(), // ID temporal
    fechaCreacion: new Date().toISOString().split('T')[0],
    estado: "Activo"
  };
  
  console.log('Guardando documento en API:', newDocumento);
  return newDocumento;
}

// Función para actualizar un documento
export function updateDocumentoApi(id, documento) {
  // Simular actualización - reemplazar con llamada real a PATCH /documentos/{id}
  console.log(`Actualizando documento ${id} en API:`, documento);
  return documento;
}

// Función para eliminar un documento
export function deleteDocumentoApi(id) {
  // Simular eliminación - reemplazar con llamada real a DELETE /documentos/{id}
  console.log(`Eliminando documento ${id} de la API`);
  return true;
}

// Función para subir archivo
export function uploadDocumentoFileApi(file, documentoId) {
  // Simular subida de archivo - implementar según tu API
  console.log(`Subiendo archivo para documento ${documentoId}:`, file.name);
  return {
    url: `/uploads/documentos/${documentoId}/${file.name}`,
    tamaño: `${(file.size / 1024 / 1024).toFixed(1)} MB`
  };
}

/* 
TODO: Reemplazar funciones mock con llamadas reales cuando tengas el backend:

// Ejemplo de implementación real:
export async function getDocumentosApi() {
  try {
    const response = await fetch(`${API_BASE_URL}/documentos`);
    if (!response.ok) throw new Error('Error al obtener documentos');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function saveDocumentoApi(documento) {
  try {
    const formData = new FormData();
    Object.keys(documento).forEach(key => {
      formData.append(key, documento[key]);
    });

    const response = await fetch(`${API_BASE_URL}/documentos`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Error al guardar documento');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
*/