// API para el microservicio de Documentos (Puerto 8083)
const API_BASE_URL = 'http://localhost:8083';

// Función para obtener todos los documentos
export async function getDocumentosApi() {
  try {
    const response = await fetch(`${API_BASE_URL}/documentos`);
    if (!response.ok) throw new Error('Error al obtener documentos');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    throw error;
  }
}

// Función para obtener un documento por ID
export async function getDocumentoByIdApi(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/documentos/${id}`);
    if (!response.ok) throw new Error('Error al obtener documento');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener documento:', error);
    throw error;
  }
}

// Función para obtener documentos por solicitud ID
export async function getDocumentosBySolicitudIdApi(solicitudId) {
  try {
    const response = await fetch(`${API_BASE_URL}/documentos/solicitud/${solicitudId}`);
    if (!response.ok) throw new Error('Error al obtener documentos de la solicitud');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener documentos de la solicitud:', error);
    throw error;
  }
}

// Función para crear un nuevo documento
export async function saveDocumentoApi(documento) {
  try {
    const response = await fetch(`${API_BASE_URL}/documentos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documento)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al guardar documento');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al guardar documento:', error);
    throw error;
  }
}

// Función para actualizar un documento
export async function updateDocumentoApi(id, documento) {
  try {
    const response = await fetch(`${API_BASE_URL}/documentos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documento)
    });
    
    if (!response.ok) throw new Error('Error al actualizar documento');
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar documento:', error);
    throw error;
  }
}

// Función para eliminar un documento
export async function deleteDocumentoApi(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/documentos/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('Error al eliminar documento');
    return true;
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    throw error;
  }
}

// Función para subir archivo
export async function uploadDocumentoFileApi(file, documentoId) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/documentos/${documentoId}/upload`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Error al subir archivo');
    return await response.json();
  } catch (error) {
    console.error('Error al subir archivo:', error);
    throw error;
  }
}